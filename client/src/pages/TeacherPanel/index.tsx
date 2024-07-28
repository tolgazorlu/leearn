import { Button } from "@/components/ui/button";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import Header from "@/components/TeacherPanel/Header";
import Sidebar from "@/components/TeacherPanel/Sidebar";
import { ArrowUpRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useCreateWalletMutation, useGetUserWallet } from "@/api/auth";
import { useState } from "react";
import Transaction from "@/components/Transaction";

export function TeacherDashboard() {
    const { data: wallet } = useGetUserWallet();
    const { mutateAsync: createWallet } = useCreateWalletMutation();
    const [loading, setLoading] = useState(false);
    const [walletResult, setWalletResult] = useState(
        "wallet has not been created yet...!"
    );

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
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <Sidebar />
            </div>
            <div className="flex flex-col">
                <Header />
                <div className="flex min-h-screen w-full flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <div className="grid gap-4  md:gap-8">
                            <Card className="" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>Your Wallet</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Create new web3 wallet for shopping. You
                                        can buy any course safetly and easily
                                        with this web3 wallet.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button
                                        onClick={handleCreatWallet}
                                        disabled={loading}
                                    >
                                        Create New Wallet
                                    </Button>
                                </CardFooter>
                            </Card>
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
                                            Wallet Address:{" "}
                                            {wallet?.wallet?.address}
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <Transaction />
                    </main>
                </div>
            </div>
        </div>
    );
}
