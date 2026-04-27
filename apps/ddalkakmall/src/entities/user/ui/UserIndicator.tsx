import { UserApi } from "../api";

const UserIndicator = async () => {
  const user = await UserApi.getMe();
  
  return (
    <div className="flex-1 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-primary">{user.name[0]}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
        <p className="text-xs text-foreground-dim truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default UserIndicator;
