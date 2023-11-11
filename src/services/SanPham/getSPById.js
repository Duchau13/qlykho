import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

export const GetSPByID = (idSP) => {

  const getSPUrl = `/Sanpham/${idSP}`;
  const {
    response: getSPResponse,
    isLoading: getSPIsLoading,
    error: getSPError,
    refetch: getSPRefetch
  } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: getSPUrl,
    requestConfig: { }
  });
  return { getSPResponse, getSPIsLoading, getSPError, getSPRefetch };
  
};
