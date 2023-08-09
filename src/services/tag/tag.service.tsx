import Tag from "../../models/tag/tag";
import HttpService from "../http.service";

const httpService = new HttpService();

const getAllTags = async () => {
    const result = await httpService.get("/tags");
    console.log("call get all tags api")
    if (result?.status === 200) {
        const data = result.data;
        console.log("Get data: " + JSON.stringify(data));
        if (data) {
            return JSON.parse(data).data as Tag[];
        }
    }
    return undefined;
}

const getTagDetail = async (Code: number | string) => {
    const result = await httpService.get(`/tags?TagID=${Code}`)
    return JSON.parse(result?.data)
}

const getTagPosts = async (Code: number | string) => {
    const result = await httpService.get(`/tags/post?TagID=${Code}`)
    return JSON.parse(result?.data)
}

export {
    getAllTags,
    getTagDetail,
    getTagPosts
}