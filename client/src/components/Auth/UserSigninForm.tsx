import { cn } from "@/lib/utils";
import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Icons } from "../icons";
import { useSigninMutation } from "../../api/auth";
import { toast } from "../ui/use-toast";
import { User } from "@/contexts/User";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "../ui/toaster";

interface UserSigninFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSigninForm({ className, ...props }: UserSigninFormProps) {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const { state, dispatch } = useContext(User);
    const { userInfo } = state;

    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const { mutateAsync: signin, isPending } = useSigninMutation();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const data = await signin({
                email,
                password,
            });
            console.log(data);
            if (data.token) {
                setTimeout(() => {
                    navigate(redirect || "/teacher/dashboard");
                }, 3000);
                dispatch({ type: "USER_SIGNIN", payload: data });
                localStorage.setItem("userInfo", JSON.stringify(data));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Upps! Something went wrong.",
                description: `${error.response.data.message}`,
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <>
            <Toaster />
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-3">
                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isPending}
                                    onChange={(event: {
                                        target: {
                                            value: React.SetStateAction<string>;
                                        };
                                    }) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="********"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    disabled={isPending}
                                    onChange={(event: {
                                        target: {
                                            value: React.SetStateAction<string>;
                                        };
                                    }) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <Button disabled={isPending}>
                            {isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Signin to leearn!
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isPending}>
                    {isPending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
            </div>
        </>
    );
}
