

import React, { FC, useEffect, useState } from 'react';

import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiOutlineConsoleSql, AiOutlineHeart } from 'react-icons/ai';
import RespondSection from './RespondSection';
import { CommunityRepository, PostRepository, UserRepository } from '@amityco/ts-sdk';

import { Avatar, Link } from '@chakra-ui/react';

import ReactionItem from '../../../components/Reaction/ReactionItem';
import LoadingIndicator from '../../../components/Status/LoadingIndicator';
import CardLayout from '../../../layouts/CardLayout';
import MainLayout from '../../../layouts/MainLayout';
import { PostMetaData } from '../../../models/post/post.metadata';
import AmityService from '../../../services/amity/amity.service';
import { ReactionDataProps, removeReactionAnObject, reactAnObject } from '../../../services/reaction/react.service';
import { getUserInformation } from '../../../services/user/user.service';
import { useParams } from 'react-router-dom';

function ThreadDetail() {
    const params = useParams<{ id: string }>();
    console.log(JSON.stringify(params));
    const postID = params['id'] ?? '';
    const [isLoadingPost, setIsLoadingPost] = useState(true)

    // post data
    const [post, setPost] = useState<Amity.Post | undefined>(undefined);
    // posted user 
    const [postedUser, setPostedUser] = useState<Amity.User | undefined>(undefined);
    // react commment
    const [myReaction, setMyReaction] = useState(false)
    // reaction count
    const [reactionCount, setReactionCount] = useState(post?.reactionsCount ?? 0);

    useEffect(() => {
        AmityService.getAmityService().then(async (_) => {
console.log("Get post detail")
            const { data: posts } = await PostRepository.getPostByIds([postID]);
            
            if (posts.length > 0) {
                const postData = posts[0];
                console.log(JSON.stringify(postData));
                const user = await getUserInformation(postData.postedUserId);
                // update display data
                setPost(postData);
                setPostedUser(user);
                setReactionCount(postData.reactionsCount)
                setMyReaction((postData.myReactions ?? []).length > 0)
            }

            //update loading status
            setIsLoadingPost(false);

        })
    }, [])



    const handleGetPostDetail = async () => {
        const { data: posts } = await PostRepository.getPostByIds([postID]);
        if (posts.length > 0) {
            const postData = posts[0];
            console.log(JSON.stringify(postData));
            const user = await getUserInformation(postData.postedUserId);
            // update display data
            setPost(postData);
            setPostedUser(user);
            setReactionCount(postData.reactionsCount)
            setMyReaction((postData.myReactions ?? []).length > 0)
        }

        //update loading status
        setIsLoadingPost(false);
    }

    const handlePostReaction = async () => {
        const postReaction: ReactionDataProps = {
            targetType: 'post',
            targetID: postID,
        }
        //add reaction

        if (myReaction) {
            //remove reaction if post is reacted
            setMyReaction(false);
            setReactionCount(prev => prev - 1)
            const result = await removeReactionAnObject(postReaction);
            console.log("Remove reaction to post: " + result);

        } else {
            setMyReaction(true);
            setReactionCount(prev => prev + 1)
            const result = await reactAnObject(postReaction);
            console.log("Remove reaction to post: " + result);
        }


    }


    return (
        <MainLayout onActionAfter={handleGetPostDetail}>
            <div className="mx-5">
                {isLoadingPost
                    // ? <>Loadinggggg</h2>
                    ? <LoadingIndicator />
                    : <CardLayout>
                        <div className="flex flex-col">
                            {/* Post Content */}
                            {post &&
                                <>
                                    <div className="flex flex-col w-full px-2 py-3">
                                        {/* Posted User */}
                                        <div className="flex flex-row items-center mb-5">
                                            <Link href={`/user/profile?id=${postedUser?.userId}`}><Avatar src={postedUser?.avatarCustomUrl} size={'md'} /></Link>

                                            <div className="flex flex-col flex-grow justify-center space-y-2 ml-2">
                                                <Link href={`/user/profile?id=${postedUser?.userId}`}>
                                                    <h3 className="text-[#3F4354] text-sm font-medium">{postedUser?.displayName}</h3>
                                                </Link>
                                                <span className="text-[#8D8080] text-xs">{new Date(post?.createdAt).toLocaleString()}</span>
                                            </div>
                                            <FiMoreHorizontal size={24} />
                                        </div>
                                        {/* Title */}
                                        {/* <div className="pb-4">
                                    <h2 className="text-[#3F4354] text-2xl my-1" >{}</h2>
                                </div> */}
                                        {/* Post Content */}
                                        <div className="prose py-2">
                                            <h2>{(post.metadata as PostMetaData).title}</h2>
                                            <img src={(post.metadata as PostMetaData).thumbnailUrl} style={{ margin: "0 auto" }} />
                                            <div dangerouslySetInnerHTML={{ __html: (post?.data as Amity.ContentDataText).text }} />
                                        </div>
                                        {/* Reaction */}
                                        <div className="flex items-center gap-4"

                                        >
                                            <ReactionItem icon={
                                                myReaction
                                                    ? <AiFillHeart color='red' size={24} onClick={handlePostReaction} />
                                                    : <AiOutlineHeart size={24} onClick={handlePostReaction} />

                                            } reactionCount={reactionCount >= 0 ? reactionCount : 0} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end mb-5">
                                        <span className="text-gray-400 text-xl font-medium mr-3">Responses</span>
                                        <span className="text-black text-base font-medium text-center w-6 h-6 rounded bg-purple-300">{post.commentsCount}</span>
                                    </div>
                                    {/* Respond */}
                                    <RespondSection postID={postID} />
                                </>
                            }
                            {post === undefined &&
                                <div className='flex justify-center italic text-sm'>
                                    This post is not existed!
                                </div>}

                        </div>
                    </CardLayout>
                }
            </div>
        </MainLayout>
    )
}

export default ThreadDetail;