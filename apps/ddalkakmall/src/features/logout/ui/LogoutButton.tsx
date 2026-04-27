import { LogOut } from "lucide-react";
import { logout } from "../actions/logout";

const LogoutButton = () => {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="p-1.5 rounded-lg hover:bg-surface-3 transition-colors text-foreground-dim hover:text-danger cursor-pointer"
        title="로그아웃"
      >
        <LogOut size={15} />
      </button>
    </form>
  );
};

export default LogoutButton;
