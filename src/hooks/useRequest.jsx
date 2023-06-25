import axiosDefaultInstance from '_axios/defaultInstance';
import { useCallback } from 'react';

const defaultOnSuccess = () => { }
const defaultOnError = () => { }

function useRequest() {
  const request = useCallback(async (
    method,
    url,
    payload = null,
    onSuccess = defaultOnSuccess,
    onError = defaultOnError
  ) => {
    try {
      const res = await axiosDefaultInstance({
        method: method,
        url: url,
        ...(payload && { data: payload }),
      });
      onSuccess(res?.data)
    } catch (err) {
      console.log(err)
      onError(err)
    }
  },[])

  return [request]
}

export default useRequest