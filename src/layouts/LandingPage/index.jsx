import CustomCopyright from "@/components/CustomCopyright";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";

export default function index({ children }) {
  const Navbar = dynamic(() => import("@/components/CustomNavbar"), {
    ssr: false,
  });

  return (
    <div>
      <Navbar />
      {children}
      <CustomFooter />
      <CustomCopyright />
    </div>
  );
}
