import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { theme } from "@/theme/theme";
import { DatesProvider } from "@mantine/dates";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isCoTest } from "@/utils/is-test";

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
  title: isCoTest() ? "" : "소녀전선2 서클 레벨 계산기",
  description: isCoTest() ? "" : "입력하는 시점에 따라 하루정도 차이가 날수 있음 - 묭묭이보단 파파샤",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme={"auto"} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SpeedInsights />
        <MantineProvider theme={theme} defaultColorScheme={"auto"}>
          <DatesProvider settings={{ locale: "ko" }}>
            {children}
            {modal}
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
