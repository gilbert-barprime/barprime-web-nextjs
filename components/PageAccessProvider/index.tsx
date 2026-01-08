"use client";

import { usePathname } from "next/navigation";
import { useSidebarItemsStore } from "../../lib/providers/sideBarItemsStoreProvider";
import AccessDenied from "../AccessDenied";

export default function PageAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { SidebarItem } = useSidebarItemsStore((store) => store);
  const getItemByPath = SidebarItem.find(
    (item) => pathname.includes(item.path)
  );
  const allowed = getItemByPath?.enabled;

  if (!allowed) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
