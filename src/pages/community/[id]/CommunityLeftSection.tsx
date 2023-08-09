import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import CardLayout from "../../../layouts/CardLayout"
import { useEffect, useState } from "react";
import { CommunityRepository } from "@amityco/ts-sdk";
import { getFileUrlById } from "../../../services/file/file.service";

type CommunityLeftSectionProps = {
    community?: Amity.Community,
};


function CommunityLeftSection(props: CommunityLeftSectionProps) {
    const { community } = props;
    const [communityImageUrl, setCommunityImageUrl] = useState<string | undefined>(undefined);
    const communityID = community?.communityId ?? "";
    const [joinStatus, setJoinStatus] = useState<boolean | undefined>(true)
    const handleJoinCommunity = async () => {
        joinStatus
            ? await CommunityRepository.leaveCommunity(communityID)
            : await CommunityRepository.joinCommunity(communityID)
        setJoinStatus(!joinStatus)
    }
    useEffect(() => {
        getFileUrlById(community?.avatarFileId ?? '').then((avatarUrl) => {
            setCommunityImageUrl(avatarUrl+"?size=large");
        });
    }, [])
    return (
        <div className=" bg-white rounded-2xl">
            <div className="w-full h-[200px] rounded-2xl">
                <img className="object-cover w-full h-full" src={communityImageUrl}/>
            </div>
            <div className="flex flex-col bg-white w-full p-4">
                <div className="flex justify-between w-full">
                    <div>
                        <h1 className="flex items-center justify-center text-2xl font-semibold">{community?.displayName}</h1>
                    </div>

                </div>
                <div className="flex flex-col w-2/4 justify-start mt-2">
                    <div className="flex text-lg font-medium gap-1">
                        {community?.isPublic ? <FaEarthAsia size={24} /> : <FaLock size={24} />}
                        <div>{community?.isPublic ? 'Công khai' : 'Nhóm kín'}</div>
                    </div>
                </div>
                <div className="flex flex-col mb-5 mt-3 items-start">
                    <div className="text-lg font-[550]">
                        Giới thiệu
                    </div>
                    <div>
                        <span className="font-normal">{community?.description}</span>
                        
                    </div>
                    <div className="w-full flex justify-center rounded-[5px] bg-[#163B57] text-white px-2 py-[6px] items-center mt-2" >
                        
                        <span className="text-[16px] font-semibold" onClick={() => { handleJoinCommunity() }}>{joinStatus ? "Rời khỏi nhóm" : "Tham gia nhóm"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityLeftSection