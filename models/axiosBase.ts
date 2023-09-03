import axios, { AxiosInstance } from "axios";



class AxiosBase {

  private static axiosOtomo: AxiosInstance;

  constructor() { }

  static createAxios(): void {
    if (this.axiosOtomo == null || this.axiosOtomo == undefined) {
      AxiosBase.axiosOtomo = axios.create({
        baseURL: process.env.URL_MANGA_OTOME,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Content-Encoding': 'gzip, deflate, br',
          'Content-Type': 'text/html; charset=UTF-8'
        }
      })
    }
  }

  static get otome() {
    return AxiosBase.axiosOtomo
  }
}

export default AxiosBase;