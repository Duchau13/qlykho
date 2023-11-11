import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

export const GetCTPNByID = (idPN) => {
  const getCTPNUrl = `/phieunhap/ctpn/${idPN}`;
  const {
    response: getCTPNReponse,
    isLoading: getCTPNIsLoading,
    error: getCTPNError,
    refetch: getCTPNRefetch
  } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: getCTPNUrl,
    requestConfig: { }
  });
  return { getCTPNReponse, getCTPNIsLoading, getCTPNError, getCTPNRefetch };
  
};
