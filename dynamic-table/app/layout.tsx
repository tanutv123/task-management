import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from "@/components/ToastProvider";
import {StoreWrapper} from "@/store/storeWrapper";
import UserPersistenceWrapper from "@/app/userPersistenceWrapper";

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
            <UserPersistenceWrapper>{children}</UserPersistenceWrapper>
          </ToastProvider>
        </StoreWrapper>
      </body>
    </html>
  )
}
