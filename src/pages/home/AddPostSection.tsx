
import { Input, InputGroup, InputRightElement, Modal, useDisclosure } from "@chakra-ui/react";
import { RiSearchLine } from 'react-icons/ri'
import CreatePostModal from "../../components/Modal/CreatePostModal";
import PostTargetType from "../../models/constants/PostTargetType";
import { auth } from "../../services/firebase/firebase.service";


type CPMProps = {
    callback?: () => void,
    targetID: string,
    postType: PostTargetType,
}

function AddPostSection(props: CPMProps) {
    const { postType, targetID, callback } = props
    const { isOpen, onOpen, onClose } = useDisclosure();
    const CurrentUser = auth.currentUser;
    const handleCallBack = () => {
        if (callback) {
            callback!();
        }
        onClose();
    }

    return (
        <div className="h-[40%] w-full rounded-3xl p-2">

            <div className="flex justify-between items-center gap-[8px]">
                <div className='flex place-items-center'>
                    <img className='h-[40px] w-[40px] rounded-3xl' src={CurrentUser?.photoURL ?? "https://th.bing.com/th/id/OIP.9q4WWklCRvuADPf3o9LPGwHaHf?pid=ImgDet&rs=1"} alt="" />
                </div>
                <div className="flex-grow h-full bg-[#F4F6F8]">
                    <InputGroup onClick={onOpen}>
                        <Input className="h-full" placeholder="Bạn đang nghĩ gì...." />
                        {/* <InputRightElement>
                        </InputRightElement> */}
                    </InputGroup>
                </div>
                <div className="flex justify-center items-center py-2 px-3 bg-[#163b57]  rounded-lg " >
                    <h3 className="text-center text-base text-white font-semibold">Đăng bài</h3>
                </div>
            </div>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <CreatePostModal callback={handleCallBack} postType={postType} targetID={targetID} />
            </Modal>
            { }
        </div>
    )
}

export default AddPostSection;