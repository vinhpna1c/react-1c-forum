''

import { CommunityRepository } from "@amityco/ts-sdk";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
} from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import CommunityCard from "../../components/Community/CommunityCard";
import LoadingIndicator from "../../components/Status/LoadingIndicator";
import CardLayout from "../../layouts/CardLayout";
import MainLayout from "../../layouts/MainLayout";
import UploadFileType from "../../models/constants/UploadFileType";
import { uploadSingleFileToAmity } from "../../services/file/file.service";
import { auth } from "../../services/firebase/firebase.service";
import AmityService from "../../services/amity/amity.service";

type newCommunity = {
    description: string,
    displayName: string,
    isPublic: boolean,
    avatarUrl?: string;
    coverlUrl?: string;
};

export default function AllCommunityPage() {
    console.log("All Community page render")
    // const initialRef = React.useRef(null)
    const isAuthenticated = auth.currentUser != null;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(true)
    const [communities, setCommunities] = useState<Amity.Community[]>([])

    const getCommunitiyList = async () => {
        const unsub = CommunityRepository.getCommunities({}, ({ data: communities, onNextPage, hasNextPage, loading, error }) => {
            setCommunities(communities);
            setIsLoading(false)
        });
        unsub();
    }

    useEffect(() => {
        // TODO: Make sure amityService is used with put method
        AmityService.getAmityService().then((_) => {
            getCommunitiyList();
        })
    }, [])

    const [description, setDescription] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [coverlUrl, setCoverlUrl] = useState('');

    const submitComunity = async () => {
        const currentUser = auth.currentUser;
        if (currentUser === null) {
            return false;
        }
        // TODO: set up thumbnail display and tags for post
        const CommunityData: newCommunity = {
            description,
            displayName,
            isPublic,
            avatarUrl: avatarUrl.length > 0 ? avatarUrl : undefined,
            coverlUrl: coverlUrl.length > 0 ? coverlUrl : undefined
        };
        const community = await CommunityRepository.createCommunity(CommunityData)
        console.log("Created community: \n" + JSON.stringify(community));
    }

    const uploadFileCover = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            if (files) {
                const file = files[0];
                uploadSingleFileToAmity(file, UploadFileType.IMAGE).then((uploadedFile) => {
                    setCoverlUrl(uploadedFile.fileUrl)
                });
            }
        }
    }

    const uploadFileAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            if (files) {
                const file = files[0];
                uploadSingleFileToAmity(file, UploadFileType.IMAGE).then((uploadedFile) => {
                    setAvatarUrl(uploadedFile.fileUrl)
                });
            }
        }
    }

    return (
        <MainLayout onActionAfter={getCommunitiyList}>
            <div className="mx-5">
                <CardLayout>
                    <div className="flex justify-center relative">
                        <h1 className="text-2xl font-semibold">Cộng đồng</h1>
                        {
                            isAuthenticated
                                ? <button onClick={onOpen}
                                    className="main_background h-[34px] p-[5px] rounded-[5px] text-[white] absolute right-3"
                                ><AiOutlinePlus /></button>
                                : <></>
                        }
                        {/* <Button onClick={onOpen}>Open</Button> */}
                    </div>
                    <>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader className="flex justify-center">Tạo cộng đồng mới</ModalHeader>

                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Tên cộng đồng</FormLabel>
                                        <Input placeholder='Tên cộng đồng' onChange={(e) => setDisplayName(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Giới thiệu</FormLabel>
                                        <Textarea placeholder='Giới thiệu cộng đồng' onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="mt-2">
                                        <FormLabel>Chọn avatar cho cộng đồng</FormLabel>
                                        <span className="sr-only">Chọn hình ảnh</span>
                                        <input type="file" className="block w-full text-sm text-black
                                        file:mr-2 file:py-1 file:px-2
                                        file:border-[1px]
                                        file:text-sm file:font-medium
                                        file:bg-[#F0F0F0] file:text-black
                                        hover:file:bg-[#e6e6e6]
                                        " onChange={uploadFileAvatar} accept="image/*" />
                                    </FormControl>
                                    <FormControl className="mt-2">
                                        <FormLabel>Chọn background cho cộng đồng</FormLabel>
                                        <span className="sr-only">Chọn hình ảnh</span>
                                        <input type="file" className="block w-full text-sm text-black
                                        file:mr-2 file:py-1 file:px-2
                                        file:border-[1px]
                                        file:text-sm file:font-medium
                                        file:bg-[#F0F0F0] file:text-black
                                        hover:file:bg-[#e6e6e6]
                                        " onChange={uploadFileCover} accept="image/*" />
                                    </FormControl>
                                    <FormControl className="mt-2">
                                        <FormLabel>Phạm vi nhóm</FormLabel>
                                        <Select placeholder=''>
                                            <option value="option_1" onChange={() => setIsPublic(true)}>
                                                {/* <div className="flex justify-start"> */}
                                                Nhóm công khai
                                                {/* </div> */}
                                            </option>
                                            <option value="option_2" onChange={() => setIsPublic(false)}>Nhóm kín</option>
                                        </Select>
                                    </FormControl>

                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={async () => {
                                        await submitComunity();
                                        getCommunitiyList!();
                                        onClose()
                                    }}>
                                        Tạo cộng đồng
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>


                    {isLoading
                        ? <LoadingIndicator />
                        : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mt-4 ">
                            {communities.map((community, index) => {

                                return (
                                    <CommunityCard
                                        Avatar={community.avatarFileId}
                                        CommunityName={community.displayName}
                                        CountMember={community.membersCount}
                                        CountPost={community.postsCount}
                                        Code={community.communityId}
                                        IsJoined={community.isJoined}
                                        key={index} />
                                )
                            }
                            )
                            }
                        </div>
                    }
                </CardLayout>

            </div>
        </MainLayout >
    )
}