import Navbar from "@/components/navbar";
import Footer  from '@/components/footer'
import "./globals.css";


export default function RootLayout({ children }){
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
