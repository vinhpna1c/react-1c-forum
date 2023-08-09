import User from "../../models/user/user.d";
import { CreateUser } from "../../models/user/user.dto";
import HttpService from "../http.service";
import { FollowUserRespond, FollowingRespond } from "../../models/user/follow.dto";
import { auth } from "../firebase/firebase.service";
import { UserRepository } from "@amityco/ts-sdk";

const USER_PATH = '/user';

const httpService = new HttpService();
const createUser = async (userData: CreateUser) => {
    console.info("Body create user: " + JSON.stringify(userData));
    const result = await httpService.post(USER_PATH, { body: userData });
    console.info(JSON.stringify(result))
    //created successfull
    return result?.status == 201;
}

const getUserByFirebaseUUID = async (firebaseUUID: string) => {
    const result = await httpService.get(USER_PATH, { params: { UUID: firebaseUUID } });

    if (result?.status === 200) {
        const user = JSON.parse(result.data) as User;
        return user;
    }
    return undefined;
}

const getFollowingByUUID = async (UUID: string) => {
    const result = await httpService.get(`${USER_PATH}/following`, { params: { UUID } });

    return JSON.parse(result?.data) as FollowingRespond;
}

const followOrUnfollowUser = async (targetUserID?: string) => {
    const UUID = auth.currentUser?.uid;
    const result = await httpService.post(`${USER_PATH}/following`, { body: { UserID: targetUserID, UUID } });
    return JSON.parse(result?.data) as FollowUserRespond

}

const getUserPosts = async (uuid: string | null, profileid?: string) => {
    const queryParram = profileid ? `?UserID=${uuid}&UUID=${profileid}` : `?UserID=${uuid}`
    const result = await httpService.get(`/user/post${queryParram}`);

    return JSON.parse(result?.data)
}

const getUserInformation = async (id: string) => {
    const { data: users } = await UserRepository.getUserByIds([id]);
    if (users.length > 0) {
        return users[0];
    }
    return undefined
}

export {
    createUser,
    getUserByFirebaseUUID,
    getUserInformation,
    getFollowingByUUID,
    followOrUnfollowUser,
    getUserPosts
}