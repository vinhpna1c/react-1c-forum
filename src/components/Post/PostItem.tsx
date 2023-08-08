import { BsFillBookmarkFill, BsFillChatFill } from "react-icons/bs"
import ReactionItem from "../Reaction/ReactionItem";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react"

import { Avatar } from '@chakra-ui/react'

import { UserRepository, FileRepository } from '@amityco/ts-sdk';
import LoadingIndicator from "../Status/LoadingIndicator";
import { Link } from "react-router-dom";

type PostItemProps = {
    username?: string,
    avatar?: string,
    postedAt: string,
    timePostedAt: string,
    profesional?: string,
    content?: string,
    totalComment: string | number,
    ReactionCount: string | number,
    Code?: string | number,
    reacted?: boolean,
    postedUser: string,
    tags?: string[]
}

function PostItem(props: PostItemProps) {
    const { postedUser, Code, username, avatar, postedAt, timePostedAt, profesional, content, totalComment, ReactionCount, reacted } = props
    const [user, setUser] = useState<Amity.User>();
    const [isLoading, setIsLoading] = useState(true)
    const [imgURL, setImgURL] = useState("")

    useEffect(() => {
        const unsubscribe = UserRepository.getUser(postedUser, response => {
            setUser(response.data)
            // FileRepository.getFile(user?.avatarFileId ?? "").then((item) => {
            //     setImgURL(item.data.fileUrl)
            // });
        });

        setIsLoading(false);
        unsubscribe();
    }, []);


    return (
        <>
            {isLoading
                ? <LoadingIndicator />
                :
                <div className="sub_background flex flex-col justify-center gap-[15px] p-[10px] rounded-[10px]">
                    <div className="flex justify-between">
                        <Link to={"/user/profile?id=" + postedUser}>
                            <div className="flex first-letter:gap-[10px]">
                                <Avatar className="h-9 w-9 mr-2" name={user?.displayName ?? undefined} src={user?.avatarCustomUrl ?? ''} />
                                <div className="flex flex-col justify-center">
                                    <div className="font-medium text-sm text-[#3F4354]">
                                        {username ? username : user?.displayName}
                                    </div>
                                    <div className="text-xs text-[#8D8080]">
                                        {postedAt}{timePostedAt} trước
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {/* <div className="w-20% flex justify-center items-center">
                            <button
                                className="main_background h-[34px] p-[5px] rounded-[5px] text-[white]"
                            >{profesional ? profesional : user?.roles[0]}
                            </button>
                        </div> */}
                    </div>

                    <Link to={"/thread/" + Code}>
                        <div className="prose max-h-[300px] truncate" dangerouslySetInnerHTML={{ __html: content ?? '' }} />
                    </Link>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-[15px] w-[40%]">
                            <div className="rounded-[12px] bg-[#D9D9D9] w-[34px] h-[34px] flex items-center justify-center">
                                <BsFillBookmarkFill />
                            </div>
                            <div className="h-[34px] rounded-[12px] bg-[#D9D9D9] flex items-center gap-[10px] px-[10px]">
                                <BsFillChatFill />
                                <h1 className="text-xs">Add Response</h1>
                                <div className="flex items-center justify-center bg-[#FC728B] text-[white] rounded-[5px] px-[7px]">
                                    {totalComment}
                                </div>
                            </div>
                        </div>

                        <div className="w-[30%] flex justify-end items-center gap-[15px]">
                            <ReactionItem
                                icon={
                                    reacted
                                        ? <AiFillHeart size={24}
                                        // onClick={() => handleReactComment(Code ?? "")} 
                                        />
                                        : <AiOutlineHeart size={24}
                                        // onClick={() => handleReactComment(Code ?? "")} 
                                        />
                                }
                                reactionCount={ReactionCount}
                            />
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default PostItem