import { useState } from "react";
import axios from "../../base/network/AxiosCalls";

const useApiReqHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async (url, method, payload = {}, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        headers = {Authorization : `Bearer ${token}`};
      }
      const res = await axios[method](url, payload, {headers});
      if (!res.data.success) {
        setError({message: res.data.message});
      } else {
        setData(res.data);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { loading, error, data, fetchData };
};

export default useApiReqHook;