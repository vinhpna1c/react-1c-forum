import React, { useEffect, useState } from 'react';
import { PostsCard } from "../../components"
import { PostRepository } from '@amityco/ts-sdk';
import LoadingIndicator from '../../components/Status/LoadingIndicator';
import CardLayout from '../../layouts/CardLayout';
import MainLayout from '../../layouts/MainLayout';
import { PostMetaData } from '../../models/post/post.metadata';
import AmityService from '../../services/amity/amity.service';


export default function NewsPage() {

    console.log("render news page");
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<Amity.Post[]>();

    useEffect(() => {
        AmityService.getAmityService().then(async (_) => {
            handleGetNewsPost();
        })
    }, [])


    const handleGetNewsPost = async () => {
        const unsub = PostRepository.getPosts(
            { targetId: process.env.REACT_APP_DEFAULT_COMMUNITY_ID!, targetType: "community", tags: ["baomoi"] },
            ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
                setPosts(posts);
                setIsLoading(false);
            },
        );
        unsub();
    }

    console.log("render news page");

    return (
        <MainLayout onActionAfter={handleGetNewsPost}>
            <div className="flex flex-col mx-5 font-sans">
                {isLoading
                    ? <LoadingIndicator />
                    : posts?.map((item, index) => {
                        const content = item.data as Amity.ContentDataText;
                        const postMetadata = item.metadata as PostMetaData;

                        return (
                            <CardLayout key={index}>
                                <PostsCard
                                    Code={item.postId} reacted={item.myReactions?.length == 0 ? false : true}
                                    postedUser={item.postedUserId}
                                    content={content?.text} postedAt="6" timePostedAt="h"
                                    totalComment={item.commentsCount} ReactionCount={item.reactionsCount}
                                    title={postMetadata.title}
                                    tags={item.tags}
                                    thumbnail={postMetadata.thumbnailUrl}
                                />
                            </CardLayout>
                        )
                    })
                }
            </div>
        </MainLayout >
    )
}