import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllNccUrl = '/NhaCungCap';

export const GetAllNccService = () => {
    const {
        response: getAllNccResponse,
        isLoading: getAllNccIsLoading,
        error: getAllNccError,
        refetch: getAllNccRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllNccUrl,
        requestConfig: { }
      });
    
      return { getAllNccResponse, getAllNccIsLoading, getAllNccError, getAllNccRefetch };
}