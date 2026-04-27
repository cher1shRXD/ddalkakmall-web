"use client";

import { Button, FormField, Input } from "@ddalkakmall/ui";
import { useSetupProfile } from "../hooks/useSetupProfile";

export const SetupProfileForm = () => {
  const { error, action, pending, zipcode, address, detailRef, openPostcode } = useSetupProfile();

  return (
    <form action={action} className="flex flex-col gap-5 w-full">
      <FormField label="전화번호" required>
        <Input
          name="phone"
          type="tel"
          placeholder="01048901466"
          size="lg"
        />
      </FormField>

      <FormField label="주소" required>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Input
              placeholder="우편번호"
              size="lg"
              value={zipcode}
              readOnly
            />
          </div>
          <input type="hidden" name="zipcode" value={zipcode} />
          <Button type="button" variant="outline" size="lg" onClick={openPostcode}>
            주소 검색
          </Button>
        </div>
        <div className="mt-1.5">
          <Input
            placeholder="도로명 주소"
            size="lg"
            value={address}
            readOnly
          />
        </div>
        <input type="hidden" name="address" value={address} />
      </FormField>

      <FormField label="상세주소">
        <Input
          ref={detailRef}
          name="addressDetail"
          placeholder="상세주소 (동, 호수 등)"
          size="lg"
        />
      </FormField>

      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}

      <Button type="submit" size="lg" loading={pending} className="w-full">
        저장하고 시작하기
      </Button>
    </form>
  );
};
