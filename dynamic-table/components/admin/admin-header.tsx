"use client"

import { useState } from "react"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
    sidebarWidth: number
    onMobileMenuToggle: () => void
}

export default function AdminHeader({ sidebarWidth, onMobileMenuToggle }: AdminHeaderProps) {
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New order received", time: "5 minutes ago" },
        { id: 2, title: "Customer message", time: "1 hour ago" },
        { id: 3, title: "Server update required", time: "3 hours ago" },
    ])

    return (
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 w-full">
            <div className="h-full px-4 flex items-center justify-between">
                <div className="flex items-center md:hidden">
                    <Button variant="ghost" size="icon" onClick={onMobileMenuToggle}>
                        <Menu size={20} />
                    </Button>
                </div>

                <div className="flex-1 max-w-md ml-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell size={20} />
                                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]">
                                    {notifications.length}
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {notifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="py-2 cursor-pointer">
                                    <div>
                                        <p className="font-medium text-sm">{notification.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center">
                                <Button variant="ghost" size="sm" className="w-full">
                                    View all notifications
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Help</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
