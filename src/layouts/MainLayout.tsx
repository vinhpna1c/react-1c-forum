
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import LeftSection from "./components/LeftSection";
import { CommunityRepository } from "@amityco/ts-sdk";
import { auth } from "../services/firebase/firebase.service";
import AmityService from "../services/amity/amity.service";
type MainLayoutProps = {
    children: React.ReactNode,
    onActionAfter?: () => void,
    hiddenLeft?: boolean,
}

export default function MainLayout(props: MainLayoutProps) {
    const { children, onActionAfter } = props;
    const [communities, setCommunities] = useState<Amity.Community[]>([])
    // const { sideData, setSideData } = useAuthContext();
    const firebaseUser = auth.currentUser;
    const [myCommunities, setMyCommunities] = useState<Amity.Community[] | undefined>([]);

    const handleGetMyCommunities = () => {
        const unsubMember = CommunityRepository.getCommunities({ membership: 'member' }, ({ data: myCommunities, onNextPage, hasNextPage, loading, error }) => {
            console.log('My communities: ' + JSON.stringify(myCommunities))
            // setSideData!((prev) => {
            //     return {
            //         ...prev,
            //         myCommunities
            //     };
            // });
            setMyCommunities(myCommunities);

        });
        unsubMember();
    }


    useEffect(() => {

        // init amity service if there is any action need amity 
        AmityService.getAmityService().then((_) => {
            console.log("Done init data!")
            // call callback after init amity
            if (onActionAfter) {
                onActionAfter!();
            }

            if (firebaseUser) {
                handleGetMyCommunities();
                handleGetMyCommunities();
            }

        })
    }, [])
    return (

        <div className="min-h-full">
            {/* Header */}
            <Header />
            {/* Body */}
            <div className="p-5 grid grid-cols-6 bg-slate-100">
                {/* Left bar */}
                {!props.hiddenLeft && <div className="collapse md:visible md:col-span-1">
                    <LeftSection communities={myCommunities ?? []} />
                </div>}


                {/* children */}
                <div className={props.hiddenLeft ? "col-span-full" : "col-span-6 md:col-span-5"}>
                    {children}
                </div>
                {/* RightBar */}
                {/* <div className="collapse md:visible md:col-span-1">
                         <RightSection communities={communities} />
                    </div>  */}
            </div>
        </div>
    )
}

// function useAuthContext(): { sideData: any; setSideData: any; } {
//     throw new Error("Function not implemented.");
// }
