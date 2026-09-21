import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "NecroX | Beyond Ordinary", description: "Immersive AI-powered 3D commerce." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
