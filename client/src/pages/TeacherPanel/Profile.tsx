import { useGetUserInfo, useUpdateProfileMutation } from "@/api/auth";
import Header from "@/components/TeacherPanel/Header";
import Sidebar from "@/components/TeacherPanel/Sidebar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ProfilePage() {
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
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <Sidebar />
            </div>
            <div className="flex flex-col">
                <Header />
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
                                <Link
                                    to="#"
                                    className="font-semibold text-primary"
                                >
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
                                                        setFirstname(
                                                            e.target.value
                                                        )
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
                                                        setLastname(
                                                            e.target.value
                                                        )
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
                                                        setEducation(
                                                            e.target.value
                                                        )
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
            </div>
        </div>
    );
}
