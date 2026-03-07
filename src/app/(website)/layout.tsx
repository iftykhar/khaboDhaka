import type { Metadata } from "next";
import "../globals.css";
// import Navbar from "@/components/website/Common/Navbar";
// import Footer from "@/components/website/Common/Footer";

export const metadata: Metadata = {
  title: "Khabo Dhaka",
   description:
     "Khabo Dhaka is a food delivery platform that provides delicious and healthy food to your doorstep.",
  icons:{
    icon: "/images/khabo_dhaka.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="container mx-auto">

      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
    </>
  );
}
