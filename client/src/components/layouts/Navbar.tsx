import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { User } from "@/contexts/User";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
    const navigate = useNavigate();

    const { setTheme } = useTheme();

    const { state, dispatch } = useContext(User);

    const { userInfo } = state;

    const SignoutHandler = () => {
        dispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        window.location.href = "/auth/signin";
    };

    return (
        <>
            {/* ========== HEADER ========== */}
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm py-3 md:py-0 border-b">
                <nav
                    className="max-w-7xl w-full mx-auto px-4 "
                    aria-label="Global"
                >
                    <div className="relative md:flex md:items-center md:justify-between">
                        <div className="flex items-center justify-between">
                            <Link
                                className="flex-none text-3xl font-semibold font-bandal"
                                to="/"
                                aria-label="dacospace"
                            >
                                leearn
                            </Link>
                            <div className="md:hidden">
                                <button
                                    type="button"
                                    className="hs-collapse-toggle flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                    data-hs-collapse="#navbar-collapse-with-animation"
                                    aria-controls="navbar-collapse-with-animation"
                                    aria-label="Toggle navigation"
                                >
                                    <svg
                                        className="hs-collapse-open:hidden flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1={3} x2={21} y1={6} y2={6} />
                                        <line x1={3} x2={21} y1={12} y2={12} />
                                        <line x1={3} x2={21} y1={18} y2={18} />
                                    </svg>
                                    <svg
                                        className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            id="navbar-collapse-with-animation"
                            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
                        >
                            <div className="overflow-hidden overflow-y-auto py-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                <div className="flex flex-col divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7 md:divide-y-0 md:divide-solid">
                                    <div className="pt-3 md:pt-0 mr-4">
                                        {userInfo ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            CN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>
                                                        My Account
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Billing
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Team
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={SignoutHandler}
                                                    >
                                                        Sign Out
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    navigate("/auth/signin");
                                                }}
                                                variant={"default"}
                                            >
                                                Get Started
                                            </Button>
                                        )}
                                    </div>
                                    <div className="ml-2 mr-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                    <span className="sr-only">
                                                        Toggle theme
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("light")
                                                    }
                                                >
                                                    Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("dark")
                                                    }
                                                >
                                                    Dark
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("system")
                                                    }
                                                >
                                                    System
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* ========== END HEADER ========== */}
        </>
    );
};

export default Navbar;
