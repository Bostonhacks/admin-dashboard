import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Boston Hacks 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
