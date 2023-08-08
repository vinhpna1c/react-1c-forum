
import { Button, Textarea } from "@chakra-ui/react";

import { useState } from "react";
import { auth } from "../../services/firebase/firebase.service";
import { createComment } from "../../services/comment/comment.service";
import { CreateCommentDTO } from "../../models/comment/comment.dto";


type CurrentUserProps = {
    PostID?: string,
    CommentID?: string,
    callBack?: (comment: Amity.Comment) => void,
}

function AddCommentItem(props: CurrentUserProps) {
    const currentUser = auth.currentUser;

    const [commentData, setCommentData] = useState<CreateCommentDTO>({ content: '', targetType: 'post', targetID: props.PostID ?? '' })
    const handleCreateComment = () => {
        console.log("Comment payload: "+JSON.stringify(commentData))
        createComment(commentData).then((value) => {
            if (value) {
                // call callback if create comment successfully
                if (props.callBack) {
                    const { data: comment } = value
                    console.log('Comment created: ' + JSON.stringify(comment))
                    props.callBack!(comment);
                }
            }
            //clear data
            setCommentData({ content: '', targetID: props.PostID ?? '', targetType: 'post' });
        })
    }

    return (
        <div className="flex flex-row p-2 bg-[#F4F6F8] mb-5">
            <img className="w-12 h-12 rounded-full mr-2" alt={'user_logo'} src={currentUser?.photoURL ?? "/images/avatar_place_holder.png"} />
            <div className="flex flex-grow items-end">
                <Textarea className="flex-grow mr-3" value={commentData.content} bgColor={'white'} placeholder='What are your comments ?' resize={'none'} border={'none'} minHeight={86}
                    onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                />
                <Button bgColor={'#163B57'} fontSize={12} paddingLeft={10} textColor={'white'} paddingRight={10}
                    onClick={handleCreateComment}
                >Respond</Button>
            </div>
        </div>
    )
}

export default AddCommentItem;