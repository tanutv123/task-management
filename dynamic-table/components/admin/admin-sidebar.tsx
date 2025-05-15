"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Sun,
    Moon, Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/useStore";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

interface AdminSidebarProps {
    collapsed?: boolean
    mobileOpen?: boolean
    onToggle?: () => void
    onMobileToggle?: () => void
}

function AdminSidebar({collapsed: collapsedProp, mobileOpen: mobileOpenProp, onToggle, onMobileToggle}: AdminSidebarProps) {
    // Use props if provided, otherwise use local state
    const [collapsedState, setCollapsedState] = useState(false)
    const [mobileOpenState, setMobileOpenState] = useState(false)

    const collapsed = collapsedProp !== undefined ? collapsedProp : collapsedState
    const mobileOpen = mobileOpenProp !== undefined ? mobileOpenProp : mobileOpenState

    const { userStore } = useStore();
    const router = useRouter();

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsedState(true)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const toggleSidebar = () => {
        if (onToggle) {
            onToggle()
        } else {
            setCollapsedState(!collapsed)
        }
    }

    const toggleMobileSidebar = () => {
        if (onMobileToggle) {
            onMobileToggle()
        } else {
            setMobileOpenState(!mobileOpen)
        }
    }

    const { theme, setTheme } = useTheme()

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    const navigationItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/task-management/dashboard", badge: null },
        { name: "Task Management", icon: <Briefcase size={20} />, href: "/task-management/list", badge: null },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileSidebar} />}

            {/* Mobile toggle button */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
                onClick={toggleMobileSidebar}
            >
                {mobileOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed h-full z-40 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm",
                    collapsed ? "w-20" : "w-64",
                    mobileOpen ? "left-0" : "-left-full md:left-0",
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        {!collapsed && <span className="text-xl font-bold text-gray-800 dark:text-white">Admin</span>}
                        {collapsed && <span className="text-xl font-bold text-gray-800 dark:text-white">A</span>}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="hidden md:flex rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>
                </div>

                {/* Navigation */}
                <div className="py-4">
                    <nav className="space-y-1 px-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                                    "dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
                                    item.href === "/admin/dashboard" && "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white",
                                )}
                            >
                                <div className="mr-3 flex-shrink-0">{item.icon}</div>
                                {!collapsed && <span className="flex-1">{item.name}</span>}
                                {!collapsed && item.badge && (
                                    <Badge
                                        variant="secondary"
                                        className="ml-auto bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                                {collapsed && item.badge && (
                                    <Badge
                                        variant="secondary"
                                        className="absolute right-1 top-1 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer with user profile */}
                <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            {!collapsed && (
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{userStore.user?.userName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{userStore.user?.department}</p>
                                </div>
                            )}
                        </div>
                        {!collapsed && (
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        userStore.logout().then(() => {
                                            toast.success("Logout Success");
                                            router.push("/auth/login")
                                        })
                                    }}
                                    className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        )}
                        {collapsed && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </Button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default observer(AdminSidebar);
