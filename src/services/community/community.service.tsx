import { Community } from "../../models/community/community.d";
import HttpService from "../http.service";
import { auth } from "../firebase/firebase.service";
import { Client, CommunityRepository } from "@amityco/ts-sdk";

const getAllCommunity = async () => {
    // const result = await HttpService.get(`/communities`)
    // return JSON.parse(result?.data) as Community[]
}

const getCommunityByID = async (Code: number | string, UUID: string | undefined) => {
    // const result = await HttpService.get(`/communitydetail?CommunityID=${Code}${UUID ? `&UUID=${UUID}` : ""}`)
    // return JSON.parse(result?.data)
}
const getMyCommunites = async () => {
    // not auth handling
    if (!auth.currentUser) {
        return []
    }
    const uuid = auth.currentUser.uid;
    // const result = await HttpService.get(`/usercommunities?UUID=${uuid}`);
    // if (result?.status === 200) {
    //     return JSON.parse(result.data) as Community[];
    // }
    //return if failed
    return []
}

const getCommunityPosts = async (Code: number | string, UUID: string | undefined) => {
    // const result = await HttpService.get(`/community/post?CommunityID=${Code}${UUID ? `&UUID=${UUID}` : ""}`)
    // return JSON.parse(result?.data)
}

const createCommunityJoin = async () => {
    // const result = await HttpService.post(`/postreact`, { body: { PostID: postid, UUID: uuid } })
    // return JSON.parse(result?.data)
}

export {
    getAllCommunity,
    getCommunityByID,
    getMyCommunites,
    getCommunityPosts,
    createCommunityJoin
}