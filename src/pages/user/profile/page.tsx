
//component
import { PostItem, ImageCard, PostsCard } from "../../../components"
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

//style
import "./styles.css"
import { SlUserFollow } from "react-icons/sl"

//Amity

import { Client, UserRepository, FileRepository, PostRepository } from "@amityco/ts-sdk";

import ThreadTab from "./ThreadTab"
import SavedTab from "./SavedTab"
import EditProfileTab from "./EditProfileTab"
import { useEffect, useState } from "react";
import LoadingIndicator from "../../../components/Status/LoadingIndicator";
import MainLayout from "../../../layouts/MainLayout";
import { auth } from "../../../services/firebase/firebase.service";
import { useLocation, useParams } from "react-router-dom";
import SlugParams from "../../../models/constants/SlugParams";
import { useSearchParams } from "../../../utils/handler/utils";

export default function UserProfile() {
    //Handle Params
    const urlParams = useSearchParams();
    const queryUserID = urlParams.get('id');

    //Amity
    const [user, setUser] = useState<Amity.User>();
    const [isLoading, setIsLoading] = useState(true)

    const [userFollowInfo, setuserFollowInfo] = useState<Amity.FollowInfo | undefined>(undefined);

    const [tabIndex, setTabIndex] = useState(0)

    const currentUserID = auth.currentUser?.uid ?? '';


    const tabList = [
        { label: 'Tường nhà', component: <ThreadTab queryUserID={queryUserID ?? ''} />, authenNeeded: false },
        { label: 'Bài viết đã lưu', component: <SavedTab />, authenNeeded: true },
        {
            label: 'Chỉnh sửa thông tin', component: <EditProfileTab user={user} onUpdate={(newUserProfile) => {
                setUser(newUserProfile);
            }} />, authenNeeded: true
        },
    ]

    // main funtion handle fetch data user profile
    const handleGetUserInformation = async () => {

        //Get User Avatar
        try {
            const userInformation = (await UserRepository.getUserByIds([queryUserID ?? ''])).data[0];
            if (userInformation) {
                console.log(JSON.stringify(userInformation))
                setUser(userInformation)
                // handleGetUserPost(userInformation.userId);
                handleGetFollowInfo();
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);

    }

    //Handle Follow
    const handleGetFollowInfo = async () => {
        if (queryUserID && queryUserID.length != 0) {
            const relationUnsub = UserRepository.Relationship.getFollowInfo(queryUserID ?? '', (respond) => {
                if (respond.data) {
                    setuserFollowInfo(respond.data);
                }
            });
            relationUnsub();
        }

    }
    const [followStatus, setFollowStatus] = useState(true)
    const handleFollowAction = async () => {
        followStatus
            ? await UserRepository.Relationship.unfollow(user?.userId ?? "")
            : await UserRepository.Relationship.follow(user?.userId ?? "")
        setFollowStatus(!followStatus)
    }

    useEffect(() => {
        handleGetUserInformation();
    }, [])


    return (
        <MainLayout hiddenLeft onActionAfter={handleGetUserInformation}>
            {isLoading
                ? <LoadingIndicator />
                : <div className="flex flex-col mx-5 font-sans">
                    <div className="rounded-2xl bg-white ">
                        <div className="flex flex-col max-h-max relative">
                            <div className="rounded-t-2xl w-full h-[154px] bg-gradient-to-r from-[#4158d0] via-[#C850C0] to-[#FFCC70]"></div>
                        </div>
                    </div>

                    <div className="rounded-b-2xl bg-white p-5 flex flex-col gap-4  min-h-[1080px]">
                        <div className="flex flex-col max-h-max gap-[5px] items-center">

                            <img className="w-[146px] h-[158px] rounded-lg absolute top-[160px]" src={user?.avatarCustomUrl ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgC9h2F8g-7lZmGqzIKDWblGtQtGx8h2oRMZ355DxlhGtYeDQ9nVUNfOlTGWPS4xMO-2Q&usqp=CAU"} alt="user_avatar" />

                            {!user &&
                                <div className="flex justify-center">
                                    <span className="text-base italic">This user is not existed!</span>
                                </div>}
                            {user &&
                                <div className="flex flex-col user-information gap-y-2">
                                    <div className="flex justify-center mt-20">
                                        <h1 className="font-medium text-[28px] text-[#3F4354]">{user?.displayName}</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <h1 className="font-medium text-[16px] text-[#8D8080]">{user?.roles[0]}</h1>
                                    </div>
                                    <div className="flex flex-row  items-center justify-center">
                                        <span className="font-semibold mr-2">Ngày tham gia:</span>
                                        <span>{user.createdAt}</span>
                                    </div>
                                    <div className="flex flex-row gap-x-6 items-center justify-center">
                                        <span className="tracking-tighter"><b>0</b> Bài đăng</span>
                                        <span className="tracking-tighter"><b>{userFollowInfo?.followerCount}</b> Người theo dõi</span>
                                        <span className="tracking-tighter"><b>{userFollowInfo?.followingCount}</b> Đang theo dõi</span>
                                    </div>

                                    <div className="flex justify-center">
                                        <p className="font-medium text-[16px] text-[#3F4354]">
                                            {user?.description}
                                        </p>
                                    </div>

                                    {
                                        queryUserID != currentUserID &&
                                        <div className="flex justify-center">
                                            <div className="flex rounded-[5px] bg-[#163B57] text-white px-2 py-1 items-center gap-[3px]" >
                                                <SlUserFollow size={12} />
                                                <div onClick={() => { handleFollowAction() }}>{followStatus ? "Bỏ theo dõi" : "Theo dõi"}</div>
                                            </div>
                                        </div>
                                    }
                                </div>}


                            <Tabs className="w-full" onChange={(index) => setTabIndex(index)} variant="unstyled">
                                <TabList>
                                    {(queryUserID == currentUserID ? tabList : tabList.
                                        filter(tab => tab.authenNeeded === false)
                                    )
                                        .map((tab, index) => (
                                            <Tab key={index} className={`text-base ${index == tabIndex ? 'font-semibold' : 'font-normal'}`}>{tab.label}</Tab>)
                                        )}
                                </TabList>
                                <TabIndicator
                                    mt="-2x"
                                    height="2px"
                                    bg="blue.500"
                                    borderRadius="1px"
                                />
                                <TabPanels p='2rem'>
                                    {(queryUserID == currentUserID ? tabList : tabList.filter(tab => tab.authenNeeded === false))
                                        .map((tab, index) => (
                                            <TabPanel key={index}>{tab.component}</TabPanel>)
                                        )}
                                </TabPanels>
                            </Tabs>

                        </div>
                    </div>

                </div>
            }
        </MainLayout >
    )
}