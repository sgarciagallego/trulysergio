import "./globals.scss"
import localFont from "next/font/local"
import { Providers } from "../theme/providers"
import Navbar from "../components/molecules/navbar/navbar"

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
  subsets: ["latin"],
  display: "swap",
  variable: "--font",
})

export const metadata = {
  title: "",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={wotfard.variable}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
