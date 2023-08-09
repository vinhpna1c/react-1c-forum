

import { useDisclosure, Modal } from '@chakra-ui/react'
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { PostItem } from "../../../components"
import { useEffect, useState } from "react"
import { FaEarthAsia, FaLock } from "react-icons/fa6"
import { useParams } from 'react-router-dom'
import { PostRepository, CommunityRepository, FileRepository } from '@amityco/ts-sdk'
import CreatePostModal from '../../../components/Modal/CreatePostModal'
import LoadingIndicator from '../../../components/Status/LoadingIndicator'
import MainLayout from '../../../layouts/MainLayout'
import PostTargetType from '../../../models/constants/PostTargetType'
import { auth } from '../../../services/firebase/firebase.service'
import SlugParams from '../../../models/constants/SlugParams'
import AmityService from '../../../services/amity/amity.service'

function CommunityDetailPage() {


    const CurrentUser = auth.currentUser;
    const isAuthenticated = auth.currentUser != null;
    //api for communitk,olpy detail
    const params = useParams<SlugParams>()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingPosts, setIsLoadingPosts] = useState(true)
    const [joinStatus, setJoinStatus] = useState<boolean | undefined>(true)
    const [posts, setPosts] = useState<Amity.Post[]>();
    const [community, setCommunity] = useState<Amity.Community>();
    const [imgURL, setImgURL] = useState("")

    const communityID = params.id;

    const getCommunityPosts = () => {
        const unsub = PostRepository.getPosts(
            { targetId: communityID, targetType: "community" },
            ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
                setPosts(posts);
                setIsLoadingPosts(false);
            },
        );
        unsub();
    }

    const getCommunityDetail = async (id: string) => {
        const { data: communities } = await CommunityRepository.getCommunityByIds([id]);
        if (communities.length > 0) {
            const communityDetail = communities[0];
            setCommunity(communityDetail);
            setJoinStatus(communityDetail.isJoined)
        }
        try {
            const avatar = await FileRepository.getFile(community?.avatarFileId ?? "")
            if (avatar) {
                setImgURL(avatar.data.fileUrl + "?size=large")
            }
        } catch (error) {
            console.log("Error get community avatar url")
        }
        setIsLoading(false);
    }

    const handleFetchCommunity = async () => {
        await getCommunityDetail(communityID);
        getCommunityPosts();

    }


    useEffect(() => {
        AmityService.getAmityService().then((_) => {
            handleFetchCommunity();
        })
    }, []);

    const handleJoinCommunity = async () => {
        joinStatus
            ? await CommunityRepository.leaveCommunity(communityID)
            : await CommunityRepository.joinCommunity(communityID)
        setJoinStatus(!joinStatus)
    }

    const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure()
    console.log("Render community page")
    //
    return (
        <MainLayout onActionAfter={handleFetchCommunity}>
            {isLoading
                ? <LoadingIndicator />
                : <div className="mx-5">
                    <div className="rounded-2xl bg-white ">
                        <div className="flex flex-col max-h-max ">
                            {imgURL
                                ? <img className="rounded-t-2xl w-full h-[365px] object-cover" src={imgURL} alt="" />
                                : <div className="rounded-t-2xl w-full h-[154px] bg-gradient-to-r from-[#4158d0] via-[#C850C0] to-[#FFCC70]"></div>
                            }
                        </div>
                    </div>
                    <div className="p-5 rounded-b-2xl bg-white">
                        <div className="flex justify-between w-full">
                            <div>
                                <h1 className="flex items-center justify-center text-2xl font-semibold">{community?.displayName}</h1>
                            </div>
                            <div className="flex justify-between items-center text-lg font-medium gap-3">
                                <div className="flex rounded-[5px] bg-[#163B57] text-white px-2 py-1 items-center" >
                                    <AiOutlineUsergroupAdd size={25} />
                                    <span className="text-sm" onClick={() => { handleJoinCommunity() }}>{joinStatus ? "Rời khỏi nhóm" : "Tham gia nhóm"}</span>
                                </div>
                                {/* <div className="flex rounded-[5px] bg-[#C850C0] text-white px-2 py-1 items-center" >
                                    <AiOutlinePlus size={25} />
                                    <span className="text-sm">Mời</span>
                                </div>
                                <div className="flex rounded-[5px] bg-[#fab64ff8] text-white px-2 py-1 items-center" >
                                    <AiOutlineSearch size={25} />
                                    <button className="text-sm" type="button" onClick={onSearchOpen}>Tìm</button>
                                    <Modal isOpen={isSearchOpen} onClose={onSearchClose} >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <div className="flex flex-row justify-between p-4">
                                                <div className="w-[80%] h-full bg-[#F4F6F8]">
                                                    <InputGroup>
                                                        <Input className="h-full" placeholder="tìm kiếm trong nhóm này...." />
                                                    </InputGroup>
                                                </div>
                                                <div onClick={onSearchClose} className="flex items-center justify-center rounded-2xl p-[6px] bg-[#163B57]">
                                                    <button>
                                                        <AiOutlineClose className="text-white" size={32} />
                                                    </button>
                                                </div>
                                            </div>
                                            <ModalBody>
                                                <div className="flex flex-col">
                                                    <div className="flex justify-start">
                                                        <h1 className="text-lg font-medium">Tìm kiếm gần đây</h1>
                                                    </div>
                                                    <div className="flex justify-between text-slate-400">
                                                        <div className="flex items-center gap-2">
                                                            <div><BiSolidTimeFive /></div>
                                                            <div> Setup workspace for Javascript </div>
                                                        </div>
                                                        <div><AiOutlineClose size={25} /></div>
                                                    </div>
                                                </div>
                                            </ModalBody>

                                            <ModalFooter>
                                                <div className="flex flex-col items-center justify-center mt-3">
                                                    <div className="text-lg font-semibold text-center">Bạn đang tìm gì à?</div>
                                                    <div className="text-center">Tìm kiếm bài viết, bình luận hoặc thành viên trong {community?.displayName}.</div>
                                                </div>

                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col w-2/4 justify-start mt-2">
                            <div className="flex text-lg font-medium gap-1">
                                {community?.isPublic ? <FaEarthAsia size={24} /> : <FaLock size={24} />}
                                <div>{community?.isPublic ? 'Công khai' : 'Nhóm kín'}</div>
                            </div>
                        </div>
                        <div className="flex flex-col mb-5 mt-3">
                            <div className="text-lg font-medium">
                                Giới thiệu
                            </div>
                            <div>
                                {community?.description}
                            </div>
                        </div>
                        <div>
                        </div>
                        {/* <Tabs>
                            <TabList>
                                <Tab className="font-medium text-base text-[#3F4354]">Threads</Tab>
                                <Tab className="font-medium text-base text-[#3F4354]">Saved</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel> */}
                        {community?.isPublic || community?.isJoined
                            ? <div className="flex flex-col gap-7">
                                <div className="flex flex-col justify-center gap-[15px] p-[10px] rounded-[5px] bg-[var(--background-sub)]">
                                    {
                                        isAuthenticated
                                            ? <div className="flex justify-between">
                                                <img className='h-12 w-12 mr-2 rounded-[5px]' src={CurrentUser?.photoURL ?? ''} />
                                                <input onClick={onPostOpen} className="flex-grow p-[12px] rounded-[5px]"
                                                    type="text" placeholder="Bạn đang nghĩ gì..." />
                                            </div>
                                            : <h3>Đăng nhập để đăng bài nhé</h3>
                                    }
                                    <Modal size={'xl'} isOpen={isPostOpen} onClose={onPostClose} >
                                        <CreatePostModal callback={() => {
                                            // close modal and get posts
                                            onPostClose();
                                            getCommunityPosts();
                                        }} postType={PostTargetType.COMMUNITY} targetID={communityID} />
                                    </Modal>
                                </div>

                                {
                                    isLoadingPosts
                                        ? <LoadingIndicator />
                                        : posts?.map((item, index) => {
                                            const content = item.data as Amity.ContentDataText;

                                            return (
                                                <PostItem key={index}
                                                    Code={item.postId} reacted={item.myReactions?.length === 0 ? false : true}
                                                    postedUser={item.postedUserId}
                                                    content={content?.text} postedAt="6" timePostedAt="h"
                                                    totalComment={item.commentsCount} ReactionCount={item.reactionsCount}
                                                />
                                            )
                                        })}
                            </div>
                            : <div className="flex justify-center">
                                <h3 className="italic">Please join community to see more</h3>
                            </div>
                        }
                        {/* </TabPanel>
                                <TabPanel>
                                    {community?.isPublic || community?.isJoined
                                        ? <p>two!</p>
                                        : <div className="flex justify-center">
                                            <h3 className="italic">Please join community to see more</h3>
                                        </div>}
                                </TabPanel>
                            </TabPanels>
                        </Tabs> */}
                    </div>
                </div>
            }
        </MainLayout>

    )
}

export default CommunityDetailPage