import Sidebar from "./components/Sidebar";
import ToastProvider from "./components/ToastProvider";
import "./globals.css";
import { metdataProps } from "@/app/types/types";

export const metdata: metdataProps = {
  title: "Personnal Finance App",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
      </head>
      <body>
        <ToastProvider>
          <main className="relative flex h-screen w-screen flex-col bg-beige-100 lg:flex-row">
            <Sidebar />
            <div className="order-0 flex-1 overflow-auto px-2 py-3 lg:order-1">
              {children}
            </div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
