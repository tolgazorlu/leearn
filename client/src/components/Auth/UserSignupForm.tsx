import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Icons } from "../../components/icons";
import { useSignupMutation } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const { mutateAsync: signup, isPending } = useSignupMutation();

    const { toast } = useToast();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            await signup({ email, password });
            toast({
                variant: "default",
                title: "Check your email",
                description:
                    "We've sent you a link to create an account. Please check your email.",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Upps! Something went wrong.",
                description: `${error.response.data.message}`,
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
            console.log(error);
        }
    }

    return (
        <>
            <Toaster />
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid col-span-2 gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    name="email"
                                    value={email}
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
                            <div className="grid col-span-2 gap-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="********"
                                    type="password"
                                    name="password"
                                    value={password}
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
                            Create an account
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or signup with
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
