import { FiMoreHorizontal } from "react-icons/fi";
import ReactionItem from "../Reaction/ReactionItem";
import AddCommentItem from "../Comment/AddCommentItem";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Avatar, } from "@chakra-ui/react";
import { auth } from "../../services/firebase/firebase.service";
import { ReactionDataProps, removeReactionAnObject, reactAnObject } from "../../services/reaction/react.service";
import { getUserInformation } from "../../services/user/user.service";
import { Link } from "react-router-dom";


type CommentItemProps = {
    data: Amity.Comment,
    children?: any,
    callBack?: () => void,
}

function CommentItem(props: CommentItemProps) {
    const { data: comment, children } = props;
    const CurrentUser = auth.currentUser;
    const isAuthenticated = auth.currentUser != null;

    // posted user 
    const [postedUser, setPostedUser] = useState<Amity.User | undefined>(undefined);
    // react commment
    const [myReaction, setMyReaction] = useState((comment.myReactions ?? []).length > 0)
    // reaction count
    const [reactionCount, setReactionCount] = useState(comment?.reactionsCount ?? 0);

    const handlePostReaction = async () => {
        const postReaction: ReactionDataProps = {
            targetType: 'comment',
            targetID: comment.commentId,
        }
        //add reaction

        if (myReaction) {
            //remove reaction if post is reacted
            setMyReaction(false);
            setReactionCount(prev => prev - 1)
            const result = await removeReactionAnObject(postReaction);
            console.log("Remove reaction to comment: " + result);

        } else {
            setMyReaction(true);
            setReactionCount(prev => prev + 1)
            const result = await reactAnObject(postReaction);
            console.log("Remove reaction to comment: " + result);
        }


    }
    useEffect(() => {
        getUserInformation(comment.userId).then((user) => {
            setPostedUser(user);
        });

    }, [])
    //react commment


    // const handleReactComment = (commentid: number | string) => {
    //     createCommentReact(commentid, CurrentUser?.uid ?? "").then((value) => {
    //         if (value) {
    //             // call callback if react comment successfully
    //             if (props.callBack) {
    //                 props.callBack!()
    //             }
    //         }
    //     }).catch(() => {
    //         if (props.callBack) {
    //             props.callBack!()
    //         }
    //     }
    //     )
    //     setReact(!react)
    // }

    // const handleAddComment = () => {
    //     setAddComment(!addComment)
    // }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start mb-2">
                {/* <Avatar src={postedUser?.avatarCustomUrl} size={'xs'} /> */}
                <Link to={`/user/profile?id=${postedUser?.userId}`}>
                    <Avatar className="mr-2" src={postedUser?.avatarCustomUrl} size={'sm'} />
                </Link>

                {/* <span className="text-[#8D8080] text-xs">6h ago</span> */}

                <div className="flex flex-col flex-grow items-start">
                    <Link to={`/user/profile?id=${postedUser?.userId}`}>
                        <span className="text-sm text-black font-semibold mb-1">{postedUser?.displayName}</span>
                    </Link>
                    <p className="text-sm text-[#3F4354] font-normal">
                        {(comment.data as Amity.ContentDataText).text}
                    </p>
                </div>

                <FiMoreHorizontal size={24} />
            </div>

            <div className="flex flex-row space-x-2 gap-2 mb-4">
                <ReactionItem
                    icon={
                        myReaction
                            ? <AiFillHeart size={24} onClick={handlePostReaction}/>
                            : <AiOutlineHeart size={24} onClick={handlePostReaction}/>

                    } reactionCount={reactionCount} />
                <ReactionItem icon={<BsChatDots size={24} />} reactionCount={comment.reactionsCount} />
            </div>

            {children}

            {/* {isAuthenticated && <div className={addComment ? "block" : "hidden"}>
                <AddCommentItem CommentID={data.Code} />
            </div>
            } */}
        </div>
    )
}

export default CommentItem;