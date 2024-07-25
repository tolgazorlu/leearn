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
