import "./globals.css";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({subsets: ["latin"], weight: "400"})

export const metadata = {
  title: "Upload Images to Cloudinary",
  description: "Authored by mustopha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-slate-200 backdrop-blur-lg`}>
        {children}
      </body>
    </html>
  );
}
