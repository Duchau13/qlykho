import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllNVUrl = '/auth/getall';

export const  GetAllNVService = () => {
    const {
        response: getAllNVResponse,
        isLoading: getAllNVIsLoading,
        error: getAllNVError,
        refetch: getAllNVRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllNVUrl,
        requestConfig: { }
      });
    
      return { getAllNVResponse, getAllNVIsLoading, getAllNVError, getAllNVRefetch };
}