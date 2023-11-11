import useAxiosFunction from "../../hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";

const registerUserUrl = '/auth/register'



export const RegisterUser = () => {
    const { response: registerUserResponse,
        error: registerUserError,
        isLoading: registerUserIsLoading,
        axiosFetch: registerUserRefetch } = useAxiosFunction();

    const callRegisterUserRefetch = (dataUser) => {
        registerUserRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: registerUserUrl,
            requestConfig: {data: dataUser}
        })
    }  


    return { registerUserResponse, registerUserIsLoading, registerUserError, callRegisterUserRefetch }
}


