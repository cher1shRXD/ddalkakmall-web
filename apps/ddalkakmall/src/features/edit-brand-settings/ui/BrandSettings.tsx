import { BrandApi } from "@/entities/brand/api";
import { Spinner } from "@ddalkakmall/ui";
import { SECTIONS } from "../constants/sections";
import { BrandSettingsContent } from "./BrandSettingsContent";

interface Props {
  id: string;
}

const BrandSettings = async ({ id }: Props) => {
  const brand = await BrandApi.getById(id);
  return <BrandSettingsContent brand={brand} />;
};

BrandSettings.Skeleton = () => (
  <aside className="w-200 border-l border-border shrink-0 h-screen flex">
    <div className="flex-1 flex items-center justify-center">
      <Spinner />
    </div>
    <nav className="w-36 shrink-0 border-l border-border py-5 px-2 flex flex-col gap-0.5">
      {SECTIONS.map(({ id, label, icon }) => (
        <div key={id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-foreground-dim">
          <span className="shrink-0">{icon}</span>
          {label}
        </div>
      ))}
    </nav>
  </aside>
);

export default BrandSettings;
