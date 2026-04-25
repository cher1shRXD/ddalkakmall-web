import HomeGreeting from "@/widgets/home/ui/HomeGreeting";
import { Link } from "@cher1shrxd/loading";
import { Button } from "@ddalkakmall/ui";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-12">
      <HomeGreeting />
      <Link href="/create">
        <Button size="lg">내 브랜드 런칭하기</Button>
      </Link>
    </div>
  );
}
