import type React from "react"
import type { Metadata } from "next"
import { 
  Gideon_Roman as Times_New_Roman, 
  Georama as Georgia, 
  Inter, 
  Dancing_Script, 
  Great_Vibes,
  Playfair_Display,
  Lato,
  Open_Sans,
  Merriweather,
  Roboto_Slab,
  Source_Serif_4,
  Cormorant_Garamond,
  Tinos
} from "next/font/google"
import "./globals.css"

const timesNewRoman = Times_New_Roman({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-times",
  weight: ["400"],
})

const georgia = Georgia({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-georgia",
  weight: ["400", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signature",
  weight: ["400", "700"],
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signature-handwriting",
  weight: ["400"],
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-elegant",
  weight: ["400", "700"],
})

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-modern",
  weight: ["300", "400", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-clean",
  weight: ["300", "400", "600", "700"],
})

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-traditional",
  weight: ["300", "400", "700"],
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-slab",
  weight: ["400", "700"],
})

const sourceSerifPro = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-premium",
  weight: ["400", "600", "700"],
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-classic",
  weight: ["300", "400", "500", "600"],
})

const tinos = Tinos({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-official",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Student Document Generator - ID Cards, Transcripts, Admission Letters",
  description:
    "Professional online document generator for creating authentic-style student ID cards, official transcripts, and admission letters",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${timesNewRoman.variable} ${georgia.variable} ${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${lato.variable} ${openSans.variable} ${merriweather.variable} ${robotoSlab.variable} ${sourceSerifPro.variable} ${cormorantGaramond.variable} ${tinos.variable}`}
    >
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
