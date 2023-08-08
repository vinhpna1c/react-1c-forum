import { ModalOverlay, ModalContent, InputGroup, ModalBody, ModalFooter, Input } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";

type SearchModalProps = {
    closeFunction?: () => void,
}

export default function CommunitySearchModal(props: SearchModalProps) {
    return (
        <>
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
                        <button onClick={() => { if (props.closeFunction) { props.closeFunction!() } }}>
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
                                <div> Setup workspace for Javascript </div>
                            </div>
                            <div><AiOutlineClose size={25} /></div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div className="flex flex-col items-center justify-center mt-3">
                        <div className="text-lg font-semibold text-center">Bạn đang tìm gì à?</div>
                        <div className="text-center">Tìm kiếm bài viết, bình luận hoặc thành viên trong Cộng đồng JavaScript Việt Nam.</div>
                    </div>

                </ModalFooter>
            </ModalContent>
        </>
    );
}