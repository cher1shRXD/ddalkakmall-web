"use client";

import { motion } from "framer-motion";
import { Button } from "@ddalkakmall/ui";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "@cher1shrxd/loading";

interface Props {
  payState?: string;
  brandName?: string;
  brandId?: string;
}

const Complete = ({ payState, brandName, brandId }: Props) => {
  const isSuccess = payState === undefined || payState === "4";

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-10">
      <motion.div
        className="w-full max-w-md flex flex-col items-start gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {isSuccess ? (
          <>
            <CheckCircle className="text-success" size={40} strokeWidth={1.5} />
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-foreground leading-tight">
                결제가 완료됐어요
              </h1>
              <p className="text-lg text-foreground-sub">
                <span className="text-foreground font-semibold">{brandName}</span> 브랜드가 곧 준비될 거예요.
              </p>
            </div>
            <Link href={brandId ? `/brands/${brandId}` : "/"} className="w-full">
              <Button size="lg" fullWidth rightIcon={<ArrowRight size={16} />}>
                시작하기
              </Button>
            </Link>
          </>
        ) : (
          <>
            <XCircle className="text-danger" size={40} strokeWidth={1.5} />
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-foreground leading-tight">
                결제가 취소됐어요
              </h1>
              <p className="text-lg text-foreground-sub">
                결제 중 문제가 발생하거나 취소되었어요.
              </p>
            </div>
            <Link href="/create" className="w-full">
              <Button size="lg" variant="secondary" fullWidth>
                다시 시도하기
              </Button>
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Complete;
