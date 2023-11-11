import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllKhoUrl = '/kho';

export const  GetAllKhoService = () => {
    const {
        response: getAllKhoResponse,
        isLoading: getAllKhoIsLoading,
        error: getAllKhoError,
        refetch: getAllKhoRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllKhoUrl,
        requestConfig: { }
      });
    
      return { getAllKhoResponse, getAllKhoIsLoading, getAllKhoError, getAllKhoRefetch };
}