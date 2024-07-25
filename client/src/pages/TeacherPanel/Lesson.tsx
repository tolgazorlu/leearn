import Header from "@/components/TeacherPanel/Header";
import Sidebar from "@/components/TeacherPanel/Sidebar";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    useCreateNewCourseMutation,
    useDeleteCourseMutation,
    useGetCoursesQuery,
} from "@/api/course";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Tabs } from "@/components/ui/tabs";

import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export function LessonPage() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const navigate = useNavigate();

    const { mutateAsync: createCourse } = useCreateNewCourseMutation();
    const { mutateAsync: deleteCourse } = useDeleteCourseMutation();
    const { data: courses, isLoading, error, refetch } = useGetCoursesQuery();

    async function handleCreateNewCourse(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            const data = await createCourse({ title, description });
            if (data) {
                navigate(`/teacher/course/edit/${data.slug}`);
            }
            toast({
                variant: "default",
                title: "Course Created!",
                description:
                    "Your course has been created successfully. You can now add lessons to it.",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Upps! Something went wrong.",
                description: `${error}`,
            });
        }
    }

    async function handleDeleteCourse(
        event: React.SyntheticEvent,
        slug: string
    ) {
        event.preventDefault();
        try {
            const data = await deleteCourse({ slug });
            console.log(data);
            refetch();
            toast({
                variant: "default",
                title: "Course Deleted!",
                description: "Your course has been deleted successfully.",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Upps! Something went wrong.",
                description: `${error}`,
            });
        }
    }

    return (
        <>
            <Toaster />
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <Sidebar />
                </div>
                <div className="flex flex-col">
                    <Header />
                    <div className="flex min-h-screen w-full flex-col">
                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">
                                    Your Courses
                                </h1>
                            </div>
                            {courses ? (
                                <main className="grid flex-1 items-start gap-4  md:gap-8">
                                    <Tabs defaultValue="all">
                                        <div className="flex items-center">
                                            <TabsList>
                                                <TabsTrigger value="all">
                                                    All
                                                </TabsTrigger>
                                                <TabsTrigger value="active">
                                                    Active
                                                </TabsTrigger>
                                                <TabsTrigger value="draft">
                                                    Draft
                                                </TabsTrigger>
                                            </TabsList>
                                            <div className="ml-auto flex items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="h-7 gap-1">
                                                            <PlusCircle className="h-3.5 w-3.5" />
                                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                                Create New
                                                                Course
                                                            </span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Create New
                                                                Course
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Fill in the
                                                                details below to
                                                                create a new
                                                                course
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="title"
                                                                    className="text-right"
                                                                >
                                                                    Course Title
                                                                </Label>
                                                                <Input
                                                                    id="title"
                                                                    value={
                                                                        title
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setTitle(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="description"
                                                                    className="text-right"
                                                                >
                                                                    Description
                                                                </Label>
                                                                <Input
                                                                    id="description"
                                                                    value={
                                                                        description
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setDescription(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                type="submit"
                                                                onClick={
                                                                    handleCreateNewCourse
                                                                }
                                                            >
                                                                Create
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                        <TabsContent value="all">
                                            <Card x-chunk="dashboard-06-chunk-0">
                                                <CardContent>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead className="hidden w-[100px] sm:table-cell">
                                                                    <span>
                                                                        Image
                                                                    </span>
                                                                </TableHead>
                                                                <TableHead>
                                                                    Name
                                                                </TableHead>
                                                                <TableHead>
                                                                    Status
                                                                </TableHead>
                                                                <TableHead>
                                                                    Price
                                                                </TableHead>
                                                                <TableHead className="hidden md:table-cell">
                                                                    Total Sales
                                                                </TableHead>
                                                                <TableHead className="hidden md:table-cell">
                                                                    Created at
                                                                </TableHead>
                                                                <TableHead>
                                                                    <span className="sr-only">
                                                                        Actions
                                                                    </span>
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {courses.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <TableCell className="hidden sm:table-cell">
                                                                            <img
                                                                                alt="Product img"
                                                                                className="aspect-square rounded-md object-cover"
                                                                                height="64"
                                                                                src="/placeholder.svg"
                                                                                width="64"
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell className="font-medium">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Badge variant="outline">
                                                                                Draft
                                                                            </Badge>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            $499.99
                                                                        </TableCell>
                                                                        <TableCell className="hidden md:table-cell">
                                                                            25
                                                                        </TableCell>
                                                                        <TableCell className="hidden md:table-cell">
                                                                            2023-07-12
                                                                            10:42
                                                                            AM
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <DropdownMenu>
                                                                                <DropdownMenuTrigger
                                                                                    asChild
                                                                                >
                                                                                    <Button
                                                                                        aria-haspopup="true"
                                                                                        size="icon"
                                                                                        variant="ghost"
                                                                                    >
                                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                                        <span className="sr-only">
                                                                                            Toggle
                                                                                            menu
                                                                                        </span>
                                                                                    </Button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent align="end">
                                                                                    <DropdownMenuLabel>
                                                                                        Actions
                                                                                    </DropdownMenuLabel>
                                                                                    <DropdownMenuItem
                                                                                        onClick={() => {
                                                                                            navigate(
                                                                                                `/teacher/course/edit/${item.slug}`
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Edit
                                                                                    </DropdownMenuItem>
                                                                                    <DropdownMenuItem
                                                                                        onClick={(
                                                                                            e
                                                                                        ) => {
                                                                                            handleDeleteCourse(
                                                                                                e,
                                                                                                item.slug
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Delete
                                                                                    </DropdownMenuItem>
                                                                                </DropdownMenuContent>
                                                                            </DropdownMenu>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </main>
                            ) : !courses || isLoading || error ? (
                                <div
                                    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                                    x-chunk="dashboard-02-chunk-1"
                                >
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <h3 className="text-2xl font-bold tracking-tight">
                                            You have no courses
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Create a new course to get started
                                        </p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="mt-4">
                                                    Create Course
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Create New Course
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Fill in the details
                                                        below to create a new
                                                        course
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="title"
                                                            className="text-right"
                                                        >
                                                            Course Title
                                                        </Label>
                                                        <Input
                                                            id="title"
                                                            value={title}
                                                            onChange={(e) => {
                                                                setTitle(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="description"
                                                            className="text-right"
                                                        >
                                                            Description
                                                        </Label>
                                                        <Input
                                                            id="description"
                                                            value={description}
                                                            onChange={(e) => {
                                                                setDescription(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        onClick={
                                                            handleCreateNewCourse
                                                        }
                                                    >
                                                        Create
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ) : null}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
