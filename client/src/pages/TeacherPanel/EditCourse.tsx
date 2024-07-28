import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/TeacherPanel/Sidebar";
import Header from "@/components/TeacherPanel/Header";
import { useParams } from "react-router-dom";
import {
    useGetLessonsFromCourseQuery,
    useGetSingleCourseQuery,
    useUpdateCourseMutation,
} from "@/api/course";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";

import { MoreHorizontal, PlusCircle } from "lucide-react";
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
import { useEffect, useState } from "react";
import {
    useCreateNewLessonMutation,
    useDeleteLessonMutation,
} from "@/api/lesson";
import { LessonType } from "@/types/lesson";

export function EditCourse() {
    const { slug } = useParams<{ slug: string }>();
    const { data: course } = useGetSingleCourseQuery(slug!);
    const { data: courseDataForLesson } = useGetLessonsFromCourseQuery(slug!);
    const { mutateAsync: deleteLesson } = useDeleteLessonMutation();

    const [title, setTitle] = useState(course?.title || "");
    const [price, setPrice] = useState(course?.price || "");
    const [slugg, setSlugg] = useState(course?.slug || "");
    const [description, setDescription] = useState(course?.description || "");

    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonContent, setLessonContent] = useState("");

    const { mutateAsync: createNewLesson } = useCreateNewLessonMutation();

    const [lessons, setLessons] = useState<LessonType[]>([]);

    useEffect(() => {
        if (courseDataForLesson) {
            setLessons(courseDataForLesson.lessons);
        }
    }, [courseDataForLesson]);

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setPrice(course.price);
            setDescription(course.description);
        }
    }, [course, setTitle]);

    const handleCreateNewLesson = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await createNewLesson({
                title: lessonTitle,
                content: lessonContent,
                course_slug: slug!,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteLesson = async (
        event: React.SyntheticEvent,
        slug: string
    ) => {
        console.log("delete");

        event.preventDefault();
        try {
            await deleteLesson({ lesson_slug: slug });
        } catch (error) {
            console.log(error);
        }
    };

    const { mutateAsync: updateCourse } = useUpdateCourseMutation(slug!);

    const handleUpdateCourse = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await updateCourse({
                title: title,
                price: typeof price === "string" ? parseInt(price) : price,
                slug: slugg,
                description: description,
            });
        } catch (error) {
            console.log(error);
        }
    };

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
                        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                className="relative hidden flex-col items-start gap-8 md:flex"
                                x-chunk="dashboard-03-chunk-0"
                            >
                                <form className="grid w-full items-start gap-6">
                                    <fieldset className="grid gap-6 rounded-lg border p-4">
                                        <legend className="-ml-1 px-1 text-sm font-medium">
                                            Course Info
                                        </legend>
                                        <div className="grid gap-3">
                                            <Label htmlFor="title">
                                                Course Title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={title}
                                                placeholder="Course Title"
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="price">
                                                Course Price
                                            </Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                value={price}
                                                placeholder="Course Price"
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="slug">
                                                Url Link
                                            </Label>
                                            <Input
                                                id="slug"
                                                type="text"
                                                name="slug"
                                                value={slug}
                                                onChange={(e) =>
                                                    setSlugg(e.target.value)
                                                }
                                                placeholder="Course Slug"
                                                readOnly
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={description}
                                                placeholder="Course Description"
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            onClick={handleUpdateCourse}
                                        >
                                            Save
                                        </Button>
                                    </fieldset>
                                </form>
                            </div>
                            <main className="grid flex-1 items-start gap-4  md:gap-8 lg:col-span-2">
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
                                                            Create New Lesson
                                                        </span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-5xl">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Create New Lesson
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Fill in the details
                                                            below to create a
                                                            new course
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="title"
                                                                className="text-right"
                                                            >
                                                                Lesson Title
                                                            </Label>
                                                            <Input
                                                                id="title"
                                                                name={
                                                                    lessonTitle
                                                                }
                                                                value={
                                                                    lessonTitle
                                                                }
                                                                onChange={(e) =>
                                                                    setLessonTitle(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="description"
                                                                className="text-right"
                                                            >
                                                                Content
                                                            </Label>
                                                            <Textarea
                                                                rows={6}
                                                                id="description"
                                                                name={
                                                                    lessonContent
                                                                }
                                                                value={
                                                                    lessonContent
                                                                }
                                                                onChange={(e) =>
                                                                    setLessonContent(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            type="submit"
                                                            onClick={
                                                                handleCreateNewLesson
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
                                                            <TableHead>
                                                                Name
                                                            </TableHead>
                                                            <TableHead>
                                                                Content
                                                            </TableHead>
                                                            <TableHead>
                                                                <span className="sr-only">
                                                                    Actions
                                                                </span>
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {lessons.map(
                                                            (item, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="hidden md:table-cell">
                                                                        {
                                                                            item.content
                                                                        }
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
                                                                                <DropdownMenuItem>
                                                                                    Edit
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleDeleteLesson(
                                                                                            e,
                                                                                            item.slug
                                                                                        )
                                                                                    }
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
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
