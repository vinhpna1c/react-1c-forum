''

import { Modal, ModalOverlay, ModalContent, InputGroup, ModalBody, ModalFooter, useDisclosure, Input } from "@chakra-ui/react";

import { AiOutlineClose, AiOutlinePlus, AiOutlineSearch, AiOutlineUsergroupAdd } from "react-icons/ai";

import { FaEarthAsia } from "react-icons/fa6";
import CommunitySearchModal from "../../../components/Modal/CommunitySearchModal";



function CommunityHeadeṛ() {
    const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
    return (
        <div className="flex flex-col">
            <div className="flex justify-between w-full">
                <div>
                    <h1 className="flex items-center justify-center text-2xl font-semibold">Cộng đồng JAVASCRIPT Việt Nam</h1>
                </div>
                <div className="flex justify-between items-center text-lg font-medium gap-3">
                    <div className="flex rounded-[5px] bg-[#163B57] text-white px-2 py-1" >
                        <AiOutlineUsergroupAdd size={25} />
                        <span>Tham gia nhóm</span>
                    </div>
                    <div className="flex rounded-[5px] bg-[#C850C0] text-white px-2 py-1" >
                        <AiOutlinePlus size={25} />
                        <span>Mời</span>
                    </div>
                    <div className="flex rounded-[5px] bg-[#fab64ff8] text-white px-2 py-1" >
                        <AiOutlineSearch size={25} />
                        <button type="button" onClick={onSearchOpen}>Tìm</button>
                        <Modal isOpen={isSearchOpen} onClose={onSearchClose} >
                            <CommunitySearchModal closeFunction={onSearchClose} />
                        </Modal>

                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-start ">

                <FaEarthAsia className="mr-2" size={24} />
                <div className="text-lg font-medium">Công Khai</div>
            </div>
            <span className="text-lg font-medium">
                Giới thiệu
            </span>
            <p>Chia sẻ thông tin, tích lũy kinh nghiệm, học hỏi về javascript cùng nhau, học hỏi về javascript cùng nhau</p>

            <div>
            </div>
        </div>

    )
}


export default CommunityHeadeṛ;
