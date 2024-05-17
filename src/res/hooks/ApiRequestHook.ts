import { useState } from "react";
import axios from "../../base/network/AxiosCalls";

const useApiReqHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async (url, method, payload = {}) => {
    setLoading(true);
    setError(null);
    try{
      let responseConfig = { };
      if (method === "get" || method === "delete") {
        responseConfig.params = payload;
      }
      const res = await axios[method](url, payload, responseConfig);
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