import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useGetEnrolledCourses } from "@/api/auth";
import { useGetCoursesQuery } from "@/api/course";
import { CourseCardEnrolled } from "@/components/Home/CourseCardEnrolled";
import { CourseCard } from "@/components/Home/CourseCard";

export default function Courses() {
    const { data: enrolled_courses } = useGetEnrolledCourses();
    const { data: courses } = useGetCoursesQuery();

    return (
        <>
            {enrolled_courses && (
                <div className="h-full max-w-7xl mx-auto py-4 px-4">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                        <TabsContent
                            value="music"
                            className="border-none p-0 outline-none"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-semibold tracking-tight">
                                        Your Courses
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Top picks for you. Updated daily.
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="relative">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {enrolled_courses?.map((item, index) => (
                                        <CourseCardEnrolled
                                            course={item}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
            {courses && (
                <div className="h-full max-w-7xl mx-auto py-4 px-4">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                        <TabsContent
                            value="music"
                            className="border-none p-0 outline-none"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-semibold tracking-tight">
                                        Best Courses
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Top picks for you. Updated daily.
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="relative">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {courses?.map((item, index) => (
                                        <CourseCard course={item} key={index} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </>
    );
}
