import { PostRepository } from "@amityco/ts-sdk";
import { useState, useEffect } from "react";
import { PostsCard } from "../../components";
import LoadingIndicator from "../../components/Status/LoadingIndicator";
import MainLayout from "../../layouts/MainLayout";
import PostTargetType from "../../models/constants/PostTargetType";
import { PostMetaData } from "../../models/post/post.metadata";
import { auth } from "../../services/firebase/firebase.service";
import AddPostSection from "./AddPostSection";
import AmityService from "../../services/amity/amity.service";


export default function HomePage() {
    const isAuthenticated = auth.currentUser != null;
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<Amity.Post[]>();
  
    const handleGetNews = async () => {
      const unsub = PostRepository.getPosts(
        { targetId: process.env.REACT_APP_DEFAULT_COMMUNITY_ID!, targetType: "community", limit: 20 },
        ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
          setPosts(posts.sort((p1, p2) => {
            const d1 = new Date(p1.createdAt ?? '');
            const d2 = new Date(p2.createdAt ?? '');
            return d1.getTime() - d2.getTime();
          }));
          setIsLoading(false);
        },
      );
      unsub();
      console.log(posts, "hehehehe");
    }
  
    useEffect(() => {
  
      // const unsub = PostRepository.getPosts(
      //   { targetId: process.env.DEFAULT_COMMUNITY_ID!, targetType: "community" },
      //   ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
      //     setPosts(posts);
      //     setIsLoading(false);
      //   },
      // );
      // unsub();
      // console.log(posts, "hehehehe");
      AmityService.getAmityService().then((_)=>{
        handleGetNews();
      })
  
  
    }, [])
  
    return (
      <MainLayout onActionAfter={handleGetNews}>
        <div className="flex flex-col mx-5 gap-5 bg-white rounded p-4">
          {isAuthenticated &&
            <AddPostSection postType={PostTargetType.COMMUNITY} targetID={process.env.REACT_APP_DEFAULT_COMMUNITY_ID ?? ''} />
          }
  
          <div className="grid grid-cols-2 max-lg:grid-cols-1 justify-between gap-2">
            {isLoading
              ? <LoadingIndicator />
              : posts?.map((item, index) => {
                const content = item.data as Amity.ContentDataText;
                const postMetadata = item.metadata as PostMetaData;
  
                // if (index) {
  
                // }
  
                return (
                  <PostsCard
                    key={index}
                    Code={item.postId} reacted={item.myReactions?.length == 0 ? false : true}
                    postedUser={item.postedUserId}
                    content={content?.text} postedAt="6" timePostedAt="h"
                    totalComment={item.commentsCount} ReactionCount={item.reactionsCount}
                    title={postMetadata.title}
                    tags={postMetadata.tagArray}
                    thumbnail={postMetadata.thumbnailUrl + "?size=large"}
                    categories={item.tags}
                  />
                )
              })
            }
          </div>
        </div>
  
      </MainLayout >
    )
  }