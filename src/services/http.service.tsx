import { Axios } from "axios";

class HttpService {
    axios: Axios | null;
    static baseUrl = "http://103.157.218.115/Tinhte/hs/Social/v1";

    constructor(options?: { baseURL: string }) {
        const { baseURL } = options ?? {};

        this.axios = new Axios({ baseURL: baseURL ?? HttpService.baseUrl });
    }

    async get(path: string, options?: { params?: Object },) {
        const { params } = options ?? {};
        return await this.axios?.get(path, { params: params });
    }
    async post(path: string, options?: { params?: Object, body?: Object }) {

        const { params, body } = options ?? {};
        return await this.axios?.post(path, JSON.stringify(body ?? {}), { params });
    }
}

export default HttpService;