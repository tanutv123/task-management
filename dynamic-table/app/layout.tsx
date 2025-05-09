import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from "@/components/ToastProvider";
import {StoreWrapper} from "@/store/storeWrapper";

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Vifon App',
  generator: 'Tan Tai',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreWrapper>
          <ToastProvider>
            {children}
          </ToastProvider>
        </StoreWrapper>
      </body>
    </html>
  )
}
