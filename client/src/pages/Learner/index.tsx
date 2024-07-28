/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight, Menu, Box } from "lucide-react";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { User } from "@/contexts/User";
import {
    useCreateWalletMutation,
    useGetEnrolledCourses,
    useGetUserWallet,
    useUpdateTokenMutation,
} from "@/api/auth";
import Transaction from "@/components/Transaction";

export function Learner() {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(User);
    const { userInfo } = state;

    const SignoutHandler = () => {
        dispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        window.location.href = "/auth/signin";
    };

    const [walletResult, setWalletResult] = useState(
        "wallet has not been created yet...!"
    );
    const [loading, setLoading] = useState(false);

    const { mutateAsync: createWallet } = useCreateWalletMutation();
    const { mutateAsync: updateWallet } = useUpdateTokenMutation();
    const { data: enrolledCourses } = useGetEnrolledCourses();

    const handleUpdateTokens = async () => {
        try {
            const data = await updateWallet();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreatWallet = async () => {
        const data = await createWallet();
        console.log(data);
        setLoading(false);

        const sdk = new W3SSdk({
            appSettings: {
                appId: data.app_id,
            },
        });

        sdk.setAuthentication({
            userToken: data.user_token,
            encryptionKey: data.encryption_key,
        });

        console.log(sdk);
        console.log("set the app settings");
        sdk.setAuthentication({
            userToken: data.user_token || "",
            encryptionKey: data.encryption_key || "",
        });
        console.log("set the authentication");
        try {
            console.log("Challange Id: ", data.challenge_id);
            sdk.execute(data.challenge_id, (error, result) => {
                console.log("INSIDE THE EXECUTE METHOD");
                if (error) {
                    console.log(
                        `${error?.code?.toString() || "Unknown code"}: ${
                            error?.message ?? "Error!"
                        }`
                    );

                    return;
                }

                console.log(`Challenge: ${result?.type}`);
                console.log(`status: ${result?.status}`);
            });
            setWalletResult("wallet is created... congrulations...:)");
            console.log("wallet", walletResult);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    };

    // const { mutateAsync: acquireSessionToken } = useGetAcquireSessionToken();

    // const handleCreateWallet = async () => {
    //     try {
    //         const res2 = await acquireSessionToken();
    //         console.log(res2);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const { data: wallet } = useGetUserWallet();

    console.log(wallet);

    return (
        <div className="flex min-h-screen w-full flex-col">
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
                        to="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Profile
                    </Link>
                    <Link
                        to="#"
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
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4  md:gap-8">
                    <Card className="" x-chunk="dashboard-05-chunk-0">
                        <CardHeader className="pb-3">
                            <CardTitle>Your Wallet</CardTitle>
                            <CardDescription>
                                <br />
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                    Wallet ID: {wallet?.wallet?.userId}
                                </div>
                                <br />
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                    Wallet Address: {wallet?.wallet?.address}
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="" x-chunk="dashboard-05-chunk-0">
                        <CardHeader className="pb-3">
                            <CardTitle>Your Wallet</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Create new web3 wallet for shopping. You can buy
                                any course safetly and easily with this web3
                                wallet.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <div className="flex gap-4">
                                {" "}
                                <Button
                                    variant={"outline"}
                                    onClick={handleCreatWallet}
                                    disabled={loading}
                                >
                                    Create New Wallet
                                </Button>
                                <Button
                                    onClick={handleUpdateTokens}
                                    disabled={loading}
                                >
                                    Update Wallet Tokens
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 ">
                    <Card x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Enrolled Courses</CardTitle>
                                <CardDescription>
                                    Recent transactions from your store.
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link to="#">
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Url Link</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enrolledCourses?.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {item.title}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {item.price || "---------"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.slug}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button>Go Course</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <Transaction />
            </main>
        </div>
    );
}
