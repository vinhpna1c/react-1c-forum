

import { FiArrowRight } from 'react-icons/fi';
import CardLayout from '../CardLayout';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CommunityItem } from '../../components';


type communityData = {
    CommunityName: string,
    Avatar: string,
    CountPost: string | number,
    CountMember: string | number,
    IsPublic?: string,
    Code?: string,
    CoverPicture?: string,
    Introduction?: string,



}

type RightSectionProps = {
    communities: Amity.Community[],
}
export default function RightSection(props: RightSectionProps) {



    useEffect(() => {
        // TODO: Make sure amityService is used with put method
        // AmityService.putAmityService().then((_) => {
        //     const unsub = CommunityRepository.getCommunities({}, ({ data: myCommunities, onNextPage, hasNextPage, loading, error }) => {
        //         setCommunities(myCommunities);
        //         setIsLoading(loading)
        //         // console.log('myCommunitiesData: ' + myCommunities);
        //         // console.log('myCommunitiesData: ' + JSON.stringify(myCommunities));
        //     });
        //     unsub();
        // })

    }, [])
    return (
        <CardLayout>
            <div className="flex mb-5 items-end" >
                <Link to="/community">
                    <span className='text-base text-gray-600 font-semibold' >Cộng đồng </span>
                </Link>
                <FiArrowRight size={20} />
            </div>
            <div className='flex flex-col space-y-3 '>
                {props.communities.map((community, index) => {
                    var path = "/community/" + community.communityId

                    return (
                        <Link key={index} to={path}>
                            {/* <CommunityItem {...community} key={index} /> */}
                            <CommunityItem
                                Avatar={community.avatarFileId}
                                name={community.displayName}
                                postCount={community.postsCount}
                                key={index} />
                        </Link>
                    )
                })}
            </div>
        </CardLayout>
    )
}