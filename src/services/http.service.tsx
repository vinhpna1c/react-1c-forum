import { Axios } from "axios";

class HttpService {
    static axios: Axios | null;
    static baseUrl = "http://103.157.218.115/Tinhte/hs/Social/v1";
    constructor(){
        if (HttpService.axios == null) {
            console.log('Create new axios');

            const axios = new Axios({ baseURL: HttpService.baseUrl });
            HttpService.axios = axios;
        }
    }
  
    static async get(path: string, options?: { params?: Object },) {
        const { params } = options ?? {};
        return await this.axios?.get(path, { params: params });
    }
    static async post(path: string, options?: { params?: Object, body?: Object }) {
        console.log("PATH: " + path);
        console.log("option object: " + JSON.stringify(options))
        const { params, body } = options ?? {};
        console.log("Body request: " + JSON.stringify(body));
        return await this.axios?.post(path, JSON.stringify(body ?? {}), { params });
    }
}

export default HttpService;