import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

export const GetCTPXByID = (idPX) => {
  const getCTPXUrl = `/PhieuXuat/ctpx/${idPX}`;
  const {
    response: getCTPXReponse,
    isLoading: getCTPXIsLoading,
    error: getCTPXError,
    refetch: getCTPXRefetch
  } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: getCTPXUrl,
    requestConfig: { }
  });
  return { getCTPXReponse, getCTPXIsLoading, getCTPXError, getCTPXRefetch };
  
};
