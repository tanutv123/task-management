"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminSidebar from "./admin-sidebar"
import AdminHeader from "./admin-header"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(256)

  // Handle sidebar state changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
        setSidebarWidth(0)
      } else {
        setSidebarWidth(collapsed ? 80 : 256)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [collapsed])

  // Update sidebar width when collapsed state changes
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarWidth(collapsed ? 80 : 256)
    }
  }, [collapsed])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;


    return (
      <div className="h-screen flex bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Pass the toggle function to the sidebar */}
        <AdminSidebar
            onToggle={toggleSidebar}
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onMobileToggle={toggleMobileSidebar}
        />

        <div
            className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
            style={{
              marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
              width: isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
            }}
        >
          <AdminHeader sidebarWidth={sidebarWidth} onMobileMenuToggle={toggleMobileSidebar} />

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
  )
}
