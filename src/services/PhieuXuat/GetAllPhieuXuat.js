import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllPhieuXuatUrl = '/PhieuXuat';

export const  GetAllPhieuXuatService = () => {
    const {
        response: getAllPhieuXuatResponse,
        isLoading: getAllPhieuXuatIsLoading,
        error: getAllPhieuXuatError,
        refetch: getAllPhieuXuatRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllPhieuXuatUrl,
        requestConfig: { }
      });
    
      return { getAllPhieuXuatResponse, getAllPhieuXuatIsLoading, getAllPhieuXuatError, getAllPhieuXuatRefetch };
}