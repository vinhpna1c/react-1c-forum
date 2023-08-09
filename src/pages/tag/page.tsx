import React, { useEffect, useState } from 'react';
// import { CommunityPosts } from "../../components/Community/CommunityPosts"
import { TagItem } from "../../components"
import { getAllTags } from "../../services/tag/tag.service"
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../components/Status/LoadingIndicator';
import CardLayout from '../../layouts/CardLayout';
import MainLayout from '../../layouts/MainLayout';
import AmityService from '../../services/amity/amity.service';
import Tag from '../../models/tag/tag';

export default function AllTagPage() {
    const [isLoadingTags, setIsLoadingTags] = useState(true)
    const [tags, setTags] = useState<Tag[]>([])

    const handleGetAllTag = async () => {
        const tags = await getAllTags();
        console.log("result: " + JSON.stringify(tags));

        setTags(tags ?? []);
        setIsLoadingTags(false);
    }

    useEffect(() => {

        handleGetAllTag();

    }, []);
    console.log("TAGS: "+JSON.stringify(tags))
    const sliceTags = tags.length > 5 ? tags.slice(0, 5) : tags;
    return (
        <MainLayout>
            <div className="flex flex-col mx-5">
                <CardLayout>
                    {/* Trending Tag */}
                    <div className="flex flex-col">
                        <h3 className="text-xl text-[#3F4354] font-semibold">Trending Tags</h3>
                        <div className="flex flex-wrap space-x-4 mt-2 mb-4">
                            {sliceTags.map((tag, index) => {
                                return (
                                <Link key={tag.Description} to={"/tag/" + tag.Description}>
                                    <TagItem key={tag.Description} tag={tag.Description ?? ""} />
                                </Link>
                                )
                            })}
                        </div>
                        {/* All Tags */}
                        {
                            isLoadingTags
                                ? <LoadingIndicator />
                                : <>
                                    <h3 className="text-xl text-[#3F4354] font-semibold">All Tags</h3>
                                    <div className="flex flex-wrap mt-2 space-x-2 space-y-2">
                                        {tags.map((tag, index) => {
                                            const path = `/tag/${tag.Code}`

                                            return <Link key={index} to={path}><TagItem key={tag.Description} tag={tag.Description ?? ""} /></Link>
                                        })}
                                    </div>
                                </>
                        }

                    </div>
                </CardLayout>
            </div>

        </MainLayout >
    )
}
