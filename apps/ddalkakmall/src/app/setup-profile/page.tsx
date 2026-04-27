import { Heading, Text } from "@ddalkakmall/ui";
import { SetupProfileForm } from "@/features/setup-profile/ui/SetupProfileForm";

export default function SetupProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-background">
      <div className="w-full max-w-120 bg-surface-1 border border-border rounded-2xl p-8 flex flex-col gap-7">
        <div className="flex flex-col gap-1.5">
          <Heading level={2}>프로필 설정</Heading>
          <Text color="sub">
            서비스 이용을 위해 전화번호와 주소를 등록해주세요.
          </Text>
        </div>
        <SetupProfileForm />
      </div>
    </div>
  );
}
