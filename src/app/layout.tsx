"use client"

import "./globals.css"
import { Provider } from "react-redux"
import { store } from "../store/store"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
