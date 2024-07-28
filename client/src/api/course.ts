import { CourseType } from "@/types/course";
import apiClient from "@/utils/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateNewCourseMutation = () =>
    useMutation({
        mutationFn: async ({
            title,
            description,
        }: {
            title: string;
            description: string;
        }) =>
            (
                await apiClient.post<CourseType>(`course/create`, {
                    title,
                    description,
                })
            ).data,
    });

export const useGetCoursesQuery = () =>
    useQuery({
        queryKey: ["all"],
        queryFn: async () =>
            (await apiClient.get<CourseType[]>(`course/all`)).data,
    });

export const useGetSingleCourseQuery = (slug: string) =>
    useQuery({
        queryKey: ["single-course", slug],
        queryFn: async () =>
            (await apiClient.get<CourseType>(`course/${slug}`)).data,
    });

export const useDeleteCourseMutation = () =>
    useMutation({
        mutationFn: async ({ slug }: { slug: string }) =>
            (await apiClient.delete<CourseType>(`course/delete/${slug}`)).data,
    });

export const useUpdateCourseMutation = (course_slug: string) =>
    useMutation({
        mutationFn: async ({
            title,
            price,
            slug,
            description,
        }: {
            title: string;
            price: number;
            slug: string;
            description: string;
        }) =>
            (
                await apiClient.put<CourseType>(
                    `course/update/${course_slug}`,
                    { title, price, slug, description }
                )
            ).data,
    });

export const useGetLessonsFromCourseQuery = (slug: string) =>
    useQuery({
        queryKey: ["course-lessons", slug],
        queryFn: async () =>
            (await apiClient.get<CourseType>(`/course/${slug}/lessons`)).data,
    });

export const useEnrollCourseMutation = () =>
    useMutation({
        mutationFn: async ({ course_slug }: { course_slug: string }) =>
            (
                await apiClient.post<CourseType>(`course/enroll_course`, {
                    course_slug: course_slug,
                })
            ).data,
    });
