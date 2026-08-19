import '../css/style.css'

export const metadata = {
  title: 'GB Beauty Spa | Beauty · Wellness · Confidence',
  description: 'Premium facials, massages, waxing, body scrubs, fashion braces and tooth gems in Lagos, Nigeria.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
