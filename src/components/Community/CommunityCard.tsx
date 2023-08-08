
import "./styles.css"
import { Button } from '@chakra-ui/react';

import { useEffect, useState } from "react"

import { FileRepository, CommunityRepository } from '@amityco/ts-sdk';
import { Link } from "react-router-dom";
import AmityService from "../../services/amity/amity.service";
import { auth } from "../../services/firebase/firebase.service";

type CommunityCardProps = {
    CommunityName: string,
    Avatar?: string,
    CountPost: string | number,
    CountMember: string | number,
    IsPublic?: string,
    Code?: string,
    CoverPicture?: string,
    Introduction?: string,
    IsJoined?: boolean,
}

function CommunityCard(props: CommunityCardProps) {
    const isAuthenticated = auth.currentUser != null;
    const { Avatar } = props
    const [imgURL, setImgURL] = useState("")
    const [joinStatus, setJoinStatus] = useState<boolean | undefined>(props.IsJoined)

    useEffect(() => {
        AmityService.getAmityService().then((_) => {
            if (Avatar) {
                FileRepository.getFile(Avatar ?? "").then((item) => {
                    setImgURL(item.data.fileUrl + "?size=large")
                });
            }

        })
    }, []);

    const handleJoinCommunity = async () => {
        joinStatus
            ? await CommunityRepository.leaveCommunity(props.Code ?? "")
            : await CommunityRepository.joinCommunity(props.Code ?? "")
        setJoinStatus(!joinStatus)
    }

    return (

        <div className='flex flex-col rounded-lg border-[1px] border-gray-200'>
            <Link to={'/community/' + props.Code}>
                {props.Avatar
                    ? <img className='rounded-t-lg w-full h-[150px] object-cover' src={imgURL} alt="community_cover" />
                    : <img className='rounded-t-lg w-full h-[150px] object-cover' src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/84481500_488747641823180_857236512633257984_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8631f5&_nc_ohc=caQIzw5X1bIAX-5KyQr&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBznvGMt3d62w76I5ktYbt-CyD9YhR4uSEKPjMT2W2pSg&oe=64CDCD86" alt="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/84481500_488747641823180_857236512633257984_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8631f5&_nc_ohc=caQIzw5X1bIAX-5KyQr&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBznvGMt3d62w76I5ktYbt-CyD9YhR4uSEKPjMT2W2pSg&oe=64CDCD86" />
                }
            </Link>

            <div className='flex flex-col p-4 border-t-[1px] border-t-gray-100'>
                <Link to={'/community/' + props.Code}>
                    <div className='flex flex-col mb-6 h-[75px]'>
                        <h3 className='text-base text-gray-700 font-semibold max-h-14 truncate' >{props.CommunityName}</h3>
                        <div className='flex space-x-2 text-xs font-normal text-gray-400'>
                            <span>{props.CountMember ?? 0} thành viên</span>
                            <span>&#x2022;</span>
                            <span>{props.CountPost ?? 0} bài viết</span>
                        </div>
                    </div>
                </Link>

                {
                    isAuthenticated
                        ? <Button colorScheme='gray' onClick={() => { handleJoinCommunity() }}>{joinStatus ? 'Rời nhóm' : 'Tham gia nhóm'}</Button>
                        : <Button colorScheme='gray'><Link to="/">Đăng nhập để tham gia nhé</Link></Button>
                }

            </div>

        </div >
    )
}

export default CommunityCard;