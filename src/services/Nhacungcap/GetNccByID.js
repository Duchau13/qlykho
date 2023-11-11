import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

export const GetNCCByID = (idDM) => {

  const getKhoUrl = `/NhaCungCap/${idDM}`;
  const {
    response: getSPResponse,
    isLoading: getSPIsLoading,
    error: getSPError,
    refetch: getSPRefetch
  } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: getKhoUrl,
    requestConfig: { }
  });
  return { getSPResponse, getSPIsLoading, getSPError, getSPRefetch };
  
};
