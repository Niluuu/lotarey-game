import Axios from "axios";


/**
  * @see https://github.com/axios/axios
  * @see https://github.com/axios/axios#axioscreateconfig
  *
*/

const api = () => {
  const headers = {};

  return Axios.create({
    baseURL: "https://www.stoloto.ru/",
    timeout: 2000,
    withCredentails: true,
    headers
  })
}

export default api