import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getTongTienNhapURL = '/phieunhap/tongtiennhap';

export const GetTongTienNhapService = () => {
    const {
        response: getTongTienNhapResponse,
        isLoading: getTongTienNhapIsLoading,
        error: getTongTienNhapError,
        refetch: getTongTienNhapRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getTongTienNhapURL,
        requestConfig: { }
      });
    
      return { getTongTienNhapResponse, getTongTienNhapIsLoading, getTongTienNhapError, getTongTienNhapRefetch };
}