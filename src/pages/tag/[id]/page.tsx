


import { PostsCard } from "../../../components"
import React, { useEffect, useState } from 'react';

import { PostRepository } from '@amityco/ts-sdk';
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../../components/Status/LoadingIndicator";
import CardLayout from "../../../layouts/CardLayout";
import MainLayout from "../../../layouts/MainLayout";
import { PostMetaData } from "../../../models/post/post.metadata";
import SlugParams from "../../../models/constants/SlugParams";
import AmityService from "../../../services/amity/amity.service";

export default function TagDetailPage() {

    const params = useParams<SlugParams>()
    const tagStr = params.id;
    const [isLoadingPosts, setIsLoadingPosts] = useState(true)
    const [posts, setPosts] = useState<Amity.Post[]>();

    useEffect(() => {
        handleFetchPost();
    }, []);


    const getPostsByTag = async (tag: string) => {
        const unsub = PostRepository.getPosts(
            { targetId: process.env.REACT_APP_DEFAULT_COMMUNITY_ID!, targetType: "community", tags: [tag] },
            ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
                setPosts(posts);
                setIsLoadingPosts(false);
            },
        );
        unsub();
    }

    const handleFetchPost = async () => {
        await getPostsByTag(tagStr);
    }

    return (

        <MainLayout>
            {
                isLoadingPosts
                    ? <LoadingIndicator />
                    : <div className="flex flex-col mx-5 gap-5">
                        <div>
                            <CardLayout>
                                <div className="font-sans my-9 font-semibold text-xl text-[#3F4354] text-center">
                                    <h1>#{params.id}</h1>
                                </div>
                                {
                                    posts?.map((item, index) => {
                                        const content = item.data as Amity.ContentDataText;
                                        const postMetadata = item.metadata as PostMetaData;
                                        return (
                                            <PostsCard
                                                Code={item.postId} reacted={item.myReactions?.length == 0 ? false : true}
                                                postedUser={item.postedUserId}
                                                content={content?.text} postedAt="6" timePostedAt="h"
                                                totalComment={item.commentsCount} ReactionCount={item.reactionsCount}
                                                title={postMetadata.title}
                                                tags={item.tags}
                                                thumbnail={postMetadata.thumbnailUrl}
                                            />
                                        )
                                    })
                                }
                            </CardLayout>
                        </div>
                    </div>
            }
        </MainLayout >
    )
}
