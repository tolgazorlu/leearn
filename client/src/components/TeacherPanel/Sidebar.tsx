import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";

import { Box, Home, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <a
                    href="/"
                    className="flex items-center gap-2 font-semibold text-primary"
                >
                    <Box className="h-6 w-6" />
                    <span className="font-bandal text-2xl mt-1">leearn</span>
                </a>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <a
                        href="/teacher/dashboard"
                        className={`${
                            pathname == "/teacher/dashboard"
                                ? "text-primary bg-muted"
                                : "text-muted-foreground "
                        } flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </a>

                    <a
                        href="/teacher/courses"
                        className={`${
                            pathname == "/teacher/courses"
                                ? "text-primary bg-muted"
                                : "text-muted-foreground "
                        } flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
                    >
                        <Package className="h-4 w-4" />
                        Courses{" "}
                    </a>
                    {/* <a
                        href="/teacher/learners"
                        className={`${
                            pathname == "/teacher/learners"
                                ? "text-primary bg-muted"
                                : "text-muted-foreground "
                        } flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
                    >
                        <Users className="h-4 w-4" />
                        Students
                    </a> */}
                    <a
                        href="/teacher/profile"
                        className={`${
                            pathname == "/teacher/profile"
                                ? "text-primary bg-muted"
                                : "text-muted-foreground "
                        } flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </a>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                    <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Leearn Beta</CardTitle>
                        <CardDescription>
                            Get early access to Leearn Beta and help us shape
                            the future of education.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button size="sm" className="w-full">
                            Go to Project
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Sidebar;
