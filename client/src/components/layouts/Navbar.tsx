import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* ========== HEADER ========== */}
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm py-3 md:py-0 border-b">
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
                                Leearn
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
                            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                <div className="flex flex-col divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7 md:divide-y-0 md:divide-solid">
                                    <Link
                                        className="font-medium text-primary py-3 md:px-3 md:py-6"
                                        to="/"
                                        aria-current="page"
                                    >
                                        Landing
                                    </Link>
                                    <Link
                                        className="font-medium text-gray-500 hover:text-gray-400 py-3 md:px-3 md:py-6"
                                        to="/courses"
                                    >
                                        Courses
                                    </Link>
                                    <div className="pt-3 md:pt-0">
                                        <Button
                                            onClick={() => {
                                                navigate("/auth/signin");
                                            }}
                                            variant={"default"}
                                        >
                                            Signin
                                        </Button>
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
