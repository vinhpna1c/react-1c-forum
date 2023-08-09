import { PostRepository } from "@amityco/ts-sdk";

import { useEffect, useState } from "react";
import { auth } from "../../../services/firebase/firebase.service";
import { Link } from "react-router-dom";
import { PostItem } from "../../../components";
import LoadingIndicator from "../../../components/Status/LoadingIndicator";
import PostTargetType from "../../../models/constants/PostTargetType";
import AddPostSection from "../../home/AddPostSection";

type ThreadTabProps = {
    queryUserID: string,
}


export default function ThreadTab(props: ThreadTabProps) {

    const currentUserID = auth.currentUser?.uid ?? '';
    const { queryUserID } = props;

    const [userPosts, setUserPosts] = useState<Amity.Post[]>();
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    //Handle Get User Posts
    const handleGetUserPost = (userID: string) => {
        //Get User Post
        const unsub = PostRepository.getPosts(
            { targetId: userID, targetType: "content" },
            ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
                console.log("Post get: " + posts.length)
                setUserPosts(posts);
                setIsLoadingPosts(false)
            },
        );
        unsub();
    }

    useEffect(() => {
        handleGetUserPost(queryUserID);
    }, [])
    return (
        <div className="flex flex-col gap-7">
            {
                currentUserID == queryUserID &&
                <AddPostSection postType={PostTargetType.USER} targetID={queryUserID}
                    callback={() => {
                        handleGetUserPost(queryUserID)
                    }}
                />
            }
            {isLoadingPosts
                ? <LoadingIndicator />
                : <>
                    {userPosts?.map((item, index) => {
                        const path = "/thread/" + item.postId
                        const content = item.data as Amity.ContentDataText;

                        return (
                            <Link key={index} to={path}>
                                <PostItem
                                    Code={item.postId} reacted={item.myReactions?.length == 0 ? false : true}
                                    postedUser={item.postedUserId}
                                    content={content?.text} postedAt="6" timePostedAt="h"
                                    totalComment={item.commentsCount} ReactionCount={item.reactionsCount}
                                />
                            </Link>
                        )
                    })}
                    {userPosts?.length === 0 && <div className="text-sm italic font-light w-full text-center flex-wrap">Không có bài viết cá nhân</div>}
                </>}
        </div>
    )
}