
import { BsFillBookmarkFill, BsFillChatFill } from "react-icons/bs"
import { SlLike, SlDislike } from "react-icons/sl"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, InputGroup, Input } from '@chakra-ui/react'
import { AiOutlineClose } from "react-icons/ai"
import { BiSolidTimeFive } from "react-icons/bi"

type ModalItemProps = {
    communityName: string,
    historySearch: String
}

function ModalCard(props: ModalItemProps) {
    // const { username, avatar, postedAt,timePostedAt, profesional, content, totalComment, likeCount, dislikeCount } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { communityName,historySearch } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Modal Title</ModalHeader> */}
                <div className="flex flex-row justify-between p-4">
                    <div className="w-[80%] h-full bg-[#F4F6F8]">
                        <InputGroup>
                            <Input className="h-full" placeholder="tìm kiếm trong nhóm này...." />
                        </InputGroup>
                    </div>
                    <div className="flex items-center justify-center rounded-2xl p-[6px] bg-[#163B57]">
                        <button>
                            <AiOutlineClose className="text-white" size={32} />
                        </button>
                    </div>
                </div>
                <ModalBody>
                    <div className="flex flex-col">
                        <div className="flex justify-start">
                            <h1 className="text-lg font-medium">Tìm kiếm gần đây</h1>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <div className="flex items-center gap-2">
                                <div><BiSolidTimeFive /></div>
                                <div> {historySearch} </div>
                            </div>
                            <div><AiOutlineClose size={25} /></div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div className="flex flex-col items-center justify-center mt-3">
                        <div className="text-lg font-semibold text-center">Bạn đang tìm gì à?</div>
                        <div className="text-center">Tìm kiếm bài viết, bình luận hoặc thành viên trong {communityName}.</div>
                    </div>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalCard