import HttpService from "../http.service";

const getAllTags = async () => {
    const result = await HttpService.get("/tags");

    return JSON.parse(result?.data)
}

const getTagDetail = async (Code: number|string) => {
    const result = await HttpService.get(`/tags?TagID=${Code}`)
    return JSON.parse(result?.data)
} 

const getTagPosts= async (Code: number|string) => {
    const result = await HttpService.get(`/tags/post?TagID=${Code}`)
    return JSON.parse(result?.data)
} 

export {
    getAllTags,
    getTagDetail,
    getTagPosts
}