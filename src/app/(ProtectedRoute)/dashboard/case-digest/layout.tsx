import PageAccessProvider from "../../../../../components/PageAccessProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageAccessProvider>{children}</PageAccessProvider>;
}
