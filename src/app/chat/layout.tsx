import Navbar from "@/components/navbar";
import RightSidebar from "@/components/right-sidebar";
import Sidebar from "@/components/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
      <RightSidebar />
    </div>
  );
}
