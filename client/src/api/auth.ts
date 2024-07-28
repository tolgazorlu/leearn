import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { UserInfo } from "@/types/UserInfo";
import { CourseType } from "@/types/course";

export const useSigninMutation = () =>
    useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) =>
            (
                await apiClient.post<UserInfo>(`auth/signin`, {
                    email,
                    password,
                })
            ).data,
    });

export const useSignupMutation = () =>
    useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) =>
            (
                await apiClient.post<UserInfo>(`auth/signup`, {
                    email,
                    password,
                })
            ).data,
    });

export const useCreateWalletMutation = () =>
    useMutation({
        mutationFn: async () =>
            (await apiClient.post(`auth/create_wallet`)).data,
    });

export const useUpdateTokenMutation = () =>
    useMutation({
        mutationFn: async () =>
            (await apiClient.post(`auth/update_token`)).data,
    });

export const useGetUserWallet = () =>
    useQuery({
        queryKey: ["all"],
        queryFn: async () => (await apiClient.get(`auth/get_wallet`)).data,
    });

export const useGetEnrolledCourses = () =>
    useQuery({
        queryKey: ["enrolled_courses"],
        queryFn: async () =>
            (await apiClient.get<CourseType[]>(`auth/get_enrolled_courses`))
                .data,
    });

export const useGetTransactions = () =>
    useQuery({
        queryKey: ["transactions"],
        queryFn: async () =>
            (await apiClient.get(`auth/get_transactions`)).data,
    });

// export const useGetAcquireSessionToken = () =>
//     useMutation({
//         mutationFn: async () =>
//             (await apiClient.post(`auth/acquire_session_token`, {})).data,
//     });

// export const useInitializeUserMutation = () =>
//     useMutation({
//         mutationFn: async () =>
//             (await apiClient.post(`auth/initialize_user`, {})).data,
//     });

// export const useGetAppIDMutation = () =>
//     useMutation({
//         mutationFn: async () => (await apiClient.post(`auth/app_id`, {})).data,
//     });
