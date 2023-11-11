import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";


export const GetUserByID = () => {
  const userID = localStorage.getItem('idUser');
  const getInforUserUrl = `/User/${userID}`;

  const {
    response: getInforUserResponse,
    isLoading: getInforUserIsLoading,
    error: getInforUserError,
    refetch: getRefetch
  } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: getInforUserUrl,
    requestConfig: { }
  });

  return { getInforUserResponse, getInforUserIsLoading, getInforUserError, getRefetch };
};
