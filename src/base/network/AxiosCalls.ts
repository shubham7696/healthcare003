import axios from "axios";

class AxiosSingleton {
  constructor() {
    if (AxiosSingleton.instance) {
      return AxiosSingleton.instance;
    }

    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080/", // Set your base URL here
      timeout: 5000, // Set request timeout if needed
      // You can also add headers, interceptors, etc. as needed
    });

    AxiosSingleton.instance = this;
  }

  getInstance() {
    return this.axiosInstance;
  }
}

const axiosSingleton = new AxiosSingleton();
export default axiosSingleton.getInstance();