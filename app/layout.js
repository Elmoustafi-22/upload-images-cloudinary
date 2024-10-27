import "./globals.css";
import { Montserrat } from "next/font/google"
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({subsets: ["latin"], weight: "400"})

export const metadata = {
  title: "Upload Images to Cloudinary",
  description: "Authored by mustopha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-slate-200 backdrop-blur-lg`}>
        <Toaster position="top-center" reverseOrder={false}/>
        {children}
      </body>
    </html>
  );
}
