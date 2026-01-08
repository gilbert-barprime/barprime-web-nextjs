import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import { auth } from "../../../../lib/auth";
import { customFetch } from "../../../../lib/helper";
import { SidebarItemsStoreProvider } from "../../../../lib/providers/sideBarItemsStoreProvider";
import { SidebarItem } from "../../../../types";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const getSidebarItems = async () => {
    const result = await customFetch({
      url: "/subscriptions/inclusions",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    const data = result.data;

    return data as SidebarItem[];
  };

  const sidebarItems = await getSidebarItems();
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <SidebarItemsStoreProvider initialItems={sidebarItems}>
        {children}
      </SidebarItemsStoreProvider>
    </DashboardLayout>
  );
}
