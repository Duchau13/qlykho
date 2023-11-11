import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";


export const EditUserInfor = () => {
  const userID = localStorage.getItem('idUser');

  const editUserInforUrl = `/User/sua/${userID}`;

  const { response: editUserInforResponse,
    error: editUserInforError,
    isLoading: editUserInforIsLoading,
    axiosFetch: callRefetch } = useAxiosFunction();

  const callEditUserRefetch = (dataUser) => {
    callRefetch({
      axiosInstance: httpClient,
      method: 'PUT',
      url: editUserInforUrl,
      requestConfig: { data: dataUser }
    })
  }

  return { editUserInforResponse, editUserInforIsLoading, editUserInforError, callEditUserRefetch };
};
