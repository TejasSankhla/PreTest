import Sidebar from "../../components/sidebar/page"; // Import Sidebar

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 mx-auto p-2  overflow-hidden ml-16 md:ml-64">
        {children}
      </main>
    </div>
  );
}
