import "../globals.scss"
import localFont from "next/font/local"
import { Metadata } from "next"

const wotfard = localFont({
  src: [
    {
      path: "../fonts/wotfard-bold-webfont.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-bold-webfont.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-semibold-webfont.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-semibold-webfont.woff2",
      weight: "600",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-medium-webfont.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-medium-webfont.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-regular-webfont.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-regular-webfont.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-thin-webfont.ttf",
      weight: "300",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-thin-webfont.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-extralight-webfont.ttf",
      weight: "200",
      style: "normal"
    },
    {
      path: "../fonts/wotfard-extralight-webfont.woff2",
      weight: "200",
      style: "normal"
    },
  ],
  display: "swap",
  variable: "--font",
})

const leagueMono = localFont({
  src: [
    {
      path: "../fonts/league-mono.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/league-mono.woff",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/league-mono.woff2",
      weight: "400",
      style: "normal"
    },
  ],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "404: Page not found",
  description: "",
  metadataBase: new URL("https://trulysergio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: '/og-image.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`
        ${wotfard.variable}
        ${leagueMono.variable}
      `}>{children}</body>
    </html>
  )
}
