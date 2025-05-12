import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stats Cards */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">$24,780</h3>
                                <div className="flex items-center mt-1">
                    <span className="text-green-500 text-sm font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12%
                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Customers</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">321</h3>
                                <div className="flex items-center mt-1">
                    <span className="text-green-500 text-sm font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8%
                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">142</h3>
                                <div className="flex items-center mt-1">
                    <span className="text-red-500 text-sm font-medium flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      4%
                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                                <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">3.2%</h3>
                                <div className="flex items-center mt-1">
                    <span className="text-green-500 text-sm font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      2%
                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                                <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                                            #{item}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Order #{1000 + item}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Customer #{200 + item}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${(Math.random() * 200).toFixed(2)}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Customers</CardTitle>
                        <CardDescription>Latest registered users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-center">
                                        <Avatar className="h-10 w-10 mr-3">
                                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${item}`} />
                                            <AvatarFallback>U{item}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">User Name {item}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">user{item}@example.com</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined today</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
