import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllVTKhoUrl = '/vitrikho';

export const  GetAllVTKhoService = () => {
    const {
        response: getAllVTKhoResponse,
        isLoading: getAllVTKhoIsLoading,
        error: getAllVTKhoError,
        refetch: getAllVTKhoRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllVTKhoUrl,
        requestConfig: { }
      });
    
      return { getAllVTKhoResponse, getAllVTKhoIsLoading, getAllVTKhoError, getAllVTKhoRefetch };
}