import { LessonType } from "@/types/lesson";
import apiClient from "@/utils/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useCreateNewLessonMutation = () =>
    useMutation({
        mutationFn: async ({
            title,
            content,
            course_slug,
        }: {
            title: string;
            content: string;
            course_slug: string;
        }) =>
            (
                await apiClient.post<LessonType>(
                    `lesson/create/${course_slug}`,
                    {
                        title,
                        content,
                    }
                )
            ).data,
    });

export const useDeleteLessonMutation = () =>
    useMutation({
        mutationFn: async ({ lesson_slug }: { lesson_slug: string }) =>
            (await apiClient.delete<LessonType>(`lesson/delete/${lesson_slug}`))
                .data,
    });
