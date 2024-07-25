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

export const useDeleteCourseMutation = () =>
    useMutation({
        mutationFn: async ({ slug }: { slug: string }) =>
            (await apiClient.delete<CourseType>(`course/delete/${slug}`)).data,
    });
