import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CourseType } from "@/types/course";
import { useNavigate } from "react-router-dom";

export function CourseCardEnrolled({ course }: { course: CourseType }) {
    const navigate = useNavigate();
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>
                        <span className="text-primary">{course.title}</span>
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                </div>
                {/* {enrolled_courses &&
                Array.isArray(enrolled_courses) &&
                enrolled_courses.includes(course._id) ? (
                    <></>
                ) : (
                    <Button
                        onClick={(e) => {
                            handleEnrollCourse(e, course.slug);
                        }}
                    >
                        Enroll
                    </Button>
                )} */}
                <Button
                    onClick={() => {
                        navigate(`/course/${course.slug}`);
                    }}
                >
                    Go to Course
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        {course.firstname} {course.lastname}
                    </div>
                    <div className="flex items-center">
                        <StarIcon className="mr-1 h-3 w-3" />
                        20k
                    </div>
                    <div>Updated April 2023</div>
                </div>
            </CardContent>
        </Card>
    );
}
