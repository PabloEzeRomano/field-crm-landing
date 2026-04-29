import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Field CRM — Tu equipo de campo, bajo control',
  description: 'Field CRM reemplaza el caos de WhatsApp y Excel con una herramienta simple para equipos de ventas en terreno.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
