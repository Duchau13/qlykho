import useAxiosFunction from "../../hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const ForgotPassService = () => {
    const { response: ForgotPassResponse,
        error: ForgotPassError,
        isLoading: ForgotPassIsLoading,
        axiosFetch: ForgotPassRefetch } = useAxiosFunction();
        
        const callForgotPassRefetch = (email) => {
        const ForgotPassUrl = `/auth/forgot-password?email=${email}`
        ForgotPassRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ForgotPassUrl,
            requestConfig: {}
        })
    }  


    return { ForgotPassResponse, ForgotPassIsLoading, ForgotPassError, callForgotPassRefetch }
}


