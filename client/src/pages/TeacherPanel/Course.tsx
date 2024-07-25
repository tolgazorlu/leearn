import { Button } from "@/components/ui/button";

import Header from "@/components/TeacherPanel/Header";
import Sidebar from "@/components/TeacherPanel/Sidebar";

export function CoursesPage() {
    return (
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
                                Inventory
                            </h1>
                        </div>

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

                                <Button className="mt-4">Create Course</Button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
