import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllDanhMucUrl = '/Danhmuc';

export const  GetAllDanhMucService = () => {
    const {
        response: getAllDanhMucResponse,
        isLoading: getAllDanhMucIsLoading,
        error: getAllDanhMucError,
        refetch: getAllDanhMucRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllDanhMucUrl,
        requestConfig: { }
      });
    
      return { getAllDanhMucResponse, getAllDanhMucIsLoading, getAllDanhMucError, getAllDanhMucRefetch };
}