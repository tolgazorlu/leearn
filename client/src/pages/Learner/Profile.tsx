import { useGetUserInfo, useUpdateProfileMutation } from "@/api/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "@/contexts/User";
import { Box, Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(User);
    const { userInfo } = state;

    const SignoutHandler = () => {
        dispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        window.location.href = "/auth/signin";
    };

    const { data: user } = useGetUserInfo();
    const { mutateAsync: updateUser } = useUpdateProfileMutation();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [job, setJob] = useState("");
    const [age, setAge] = useState(0);
    const [education, setEducation] = useState("");

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setJob(user.job);
            setAge(user.age);
            setEducation(user.education);
        }
    }, [user]);

    const handleUpdateProfile = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const data = updateUser({
                firstname: firstname,
                lastname: lastname,
                job: job,
                age: age,
                education: education,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Box className="h-6 w-6" />
                        <span className="sr-only">Leearn</span>
                    </a>
                    <Link
                        to="/learner/profile"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/learner/settings"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Settings
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                to="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Box className="h-6 w-6" />
                                <span className="sr-only">Leearn</span>
                            </Link>
                            <Link to="#" className="hover:text-foreground">
                                Leearn
                            </Link>
                            <Link to="#" className="hover:text-foreground">
                                Profile
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial"></form>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarFallback>
                                    {userInfo?.role[0]}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    if (userInfo?.role == "teacher") {
                                        navigate("/teacher/profile");
                                    } else {
                                        navigate("/learner/profile");
                                    }
                                }}
                            >
                                Profile
                            </DropdownMenuItem>
                            {userInfo?.role == "teacher" ? (
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigate("/teacher/dashboard");
                                    }}
                                >
                                    Dashboard
                                </DropdownMenuItem>
                            ) : (
                                <></>
                            )}
                            <DropdownMenuItem onClick={SignoutHandler}>
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="flex min-h-screen w-full flex-col">
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground"
                            x-chunk="dashboard-04-chunk-0"
                        >
                            <Link to="#" className="font-semibold text-primary">
                                General
                            </Link>
                        </nav>
                        <div className="grid gap-6">
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>User Information</CardTitle>
                                    <CardDescription>
                                        You can change your information.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Firstname</Label>
                                            <Input
                                                id="firstname"
                                                name="firstname"
                                                value={firstname}
                                                onChange={(e) =>
                                                    setFirstname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Lastname</Label>
                                            <Input
                                                id="lastname"
                                                name="lastname"
                                                value={lastname}
                                                onChange={(e) =>
                                                    setLastname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Job</Label>
                                            <Input
                                                id="job"
                                                name="job"
                                                value={job}
                                                onChange={(e) =>
                                                    setJob(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Age</Label>
                                            <Input
                                                id="age"
                                                name="age"
                                                type="number"
                                                value={age}
                                                onChange={(e) =>
                                                    setAge(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Label>Education</Label>
                                            <Input
                                                id="education"
                                                name="education"
                                                value={education}
                                                onChange={(e) =>
                                                    setEducation(e.target.value)
                                                }
                                            />
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button onClick={handleUpdateProfile}>
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Profile;
