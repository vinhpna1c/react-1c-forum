

import { GoHomeFill } from 'react-icons/go';
import { AiFillMessage, AiOutlineCaretDown } from 'react-icons/ai';
import { BiSolidCalendarEvent, BiPodcast } from 'react-icons/bi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { PiMicrophoneStageFill } from 'react-icons/pi';
import { VscBellDot, VscBell } from 'react-icons/vsc';
import { RiSearchLine } from 'react-icons/ri'
import { FaHashtag } from 'react-icons/fa'
import { Image } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { Avatar, Button, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";


import { User } from "firebase/auth";
import NavigationButton from '../../components/Button/NavigationButton';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase/firebase.service';


const navs = [
    { icon: <GoHomeFill color="#C5D0E6" size={20} />, to: '/' },
    { icon: <FaHashtag color="#C5D0E6" size={20} />, to: '/tag' },
    { icon: <HiMiniUserGroup color="#C5D0E6" size={20} />, to: '/community' },
    { icon: <BiPodcast color="#C5D0E6" size={20} />, to: '#' },
    // <PiMicrophoneStageFill color="#C5D0E6" size={20} />,
]

type searchData = {
    Community: [],
    Post: [],
    User: [
        {
            Description: "",
            Code: ""
        }
    ]
}

export default function Header() {

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [authUser,setAuthUser]=useState<User|null>(null);
    // const { firebaseUser, user } = useAuthContext()??{};
    
    const firebaseUser = auth.currentUser;
    const user = undefined;
    const [input, setInput] = useState('');
    const [searchData, setSearchData] = useState([])

    const handleChange = (e: string) => {
        setInput(e);

    }
    const handleClickSearch = () => {
        // searchByKeyword(input)
        //     .then((response) => console.log(response))  

    }

    function logOut(): void {
        
    }

    return (
        <div className="flex p-5 items-center">
            <Link to={"/"}>
                <div className="flex items-center">
                    <Image width={48} height={48} className="object-contain" src={"/images/1c_logo.jpg"} alt={"1c_logo.jpg"} />
                    <span className="text-2xl text-gray-600 font-semibold">1C Forum</span>
                </div>
            </Link>
            <div className="flex flex-grow space-x-5 mx-20">
                {navs.map((nav, index) => (
                    <NavigationButton key={index} selected={currentIndex == index} to={nav.to}>{nav.icon}</NavigationButton>
                ))}
                <InputGroup>
                    <Input onChange={(e) => handleChange(e.target.value)} placeholder="Tìm kiếm..." />
                    <InputRightElement width='4.5rem'>
                        <RiSearchLine onClick={() => handleClickSearch()} size={20} color="#858EAD" />
                    </InputRightElement>
                </InputGroup>

            </div>
            <div className="flex justify-end space-x-2">
                <NavigationButton backgroundColor="#F4F6F8"><AiFillMessage color="#C5D0E6" size={20} /></NavigationButton>
                <NavigationButton backgroundColor="#F4F6F8"><VscBell color="#C5D0E6" size={20} /></NavigationButton>
                {firebaseUser ?
                    <Menu>
                        <MenuButton bgColor={'white'} as={Button} rightIcon={<AiOutlineCaretDown />}>
                            <div className="flex">
                                <Avatar size={'sm'} name={firebaseUser.displayName ?? undefined} src={firebaseUser.photoURL ?? ''} />
                                {/* <span className="ml-4 text-gray-600 text-lg font-semibold"> Ngọc Yên</span> */}
                            </div>
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Link to={"/user/profile?id=" + firebaseUser.uid}>Trang cá nhân</Link></MenuItem>
                            <MenuItem onClick={() => logOut()}>Đăng xuất</MenuItem>
                            {/* <MenuItem>Create a Copy</MenuItem> */}
                            {/* <MenuItem>Mark as Draft</MenuItem> */}
                            {/* <MenuItem>Delete</MenuItem> */}
                            {/* <MenuItem>Attend a Workshop</MenuItem> */}
                        </MenuList>
                    </Menu> :
                    <Link to={'/login'} className="bg-[#163b57] flex items-center justify-center rounded-md py-1 px-4 text-white font-semibold text-base">Sign In</Link>

                }
            </div>

        </div>
    )
}


