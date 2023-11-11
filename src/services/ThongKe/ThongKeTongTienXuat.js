import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getTongTienXuatURL = '/PhieuXuat/tongtienxuat';

export const GetTongTienXuatService = () => {
    const {
        response: getTongTienXuatResponse,
        isLoading: getTongTienXuatIsLoading,
        error: getTongTienXuatError,
        refetch: getTongTienXuatRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getTongTienXuatURL,
        requestConfig: { }
      });
    
      return { getTongTienXuatResponse, getTongTienXuatIsLoading, getTongTienXuatError, getTongTienXuatRefetch };
}