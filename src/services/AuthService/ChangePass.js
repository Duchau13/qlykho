import useAxiosFunction from "../../hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const ChangepasswordService = () => {
    const { response: changepasswordResponse,
        error: changepasswordError,
        isLoading: changepasswordIsLoading,
        axiosFetch: changepasswordRefetch } = useAxiosFunction();
        
        const callchangepasswordRefetch = (dataUser) => {
        const idUser = localStorage.getItem('idUser')
        const changepasswordUrl = `/auth/change-password/${idUser}`;
        changepasswordRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: changepasswordUrl,
            requestConfig: {data: dataUser}
        })
    }  


    return { changepasswordResponse, changepasswordIsLoading, changepasswordError, callchangepasswordRefetch }
}


