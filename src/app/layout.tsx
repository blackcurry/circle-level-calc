import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { theme } from "@/theme/theme";
import { DatesProvider } from "@mantine/dates";
import { SpeedInsights } from "@vercel/speed-insights/next";

dayjs.extend(customParseFormat);
dayjs.locale("ko");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "leveling",
  description: "leveling",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme={"auto"} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SpeedInsights />
        <MantineProvider theme={theme} defaultColorScheme={"auto"}>
          <DatesProvider settings={{ locale: "ko" }}>{children}</DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
