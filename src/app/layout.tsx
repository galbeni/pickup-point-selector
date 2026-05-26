import { ReactQueryProvider } from "@/providers/react-query.provider";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/i18n/config";
import type { Metadata } from "next";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
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
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={locales.en}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
