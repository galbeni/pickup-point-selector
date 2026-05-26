import { ReactQueryProvider } from "@/providers/react-query.provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pickup Point Selector",
  description: "BIGFISH take-home assignment",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="hu">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
