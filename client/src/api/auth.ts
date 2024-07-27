import { useMutation } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { UserInfo } from "@/types/UserInfo";

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
