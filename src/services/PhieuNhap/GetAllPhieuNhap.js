import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllPhieuNhapUrl = '/phieunhap';

export const  GetAllPhieuNhapService = () => {
    const {
        response: getAllPhieuNhapResponse,
        isLoading: getAllPhieuNhapIsLoading,
        error: getAllPhieuNhapError,
        refetch: getAllPhieuNhapRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllPhieuNhapUrl,
        requestConfig: { }
      });
    
      return { getAllPhieuNhapResponse, getAllPhieuNhapIsLoading, getAllPhieuNhapError, getAllPhieuNhapRefetch };
}