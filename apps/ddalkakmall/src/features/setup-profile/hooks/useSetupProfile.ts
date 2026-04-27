"use client";

import { useActionState, useRef, useState } from "react";
import { updateProfile } from "../actions/update-profile";

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: { zonecode: string; roadAddress: string }) => void;
      }) => { open: () => void };
    };
  }
}

export const useSetupProfile = () => {
  const [error, action, pending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        await updateProfile(formData);
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : "오류가 발생했어요.";
      }
    },
    null,
  );

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const detailRef = useRef<HTMLInputElement>(null);

  const openPostcode = () => {
    const open = () => {
      new window.daum.Postcode({
        oncomplete(data) {
          setZipcode(data.zonecode);
          setAddress(data.roadAddress);
          detailRef.current?.focus();
        },
      }).open();
    };

    if (window.daum?.Postcode) {
      open();
      return;
    }

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = open;
    document.head.appendChild(script);
  };

  return { error, action, pending, zipcode, address, detailRef, openPostcode };
};
