import "./globals.scss"
import localFont from "next/font/local"

const wotfard = localFont({
  src: [
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
  ],
  display: "swap",
  variable: "--font",
})

export const metadata = {
  title: "Admin Studio",
  description: "For the creators of this domain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={wotfard.variable}>
        {children}
      </body>
    </html>
  )
}
