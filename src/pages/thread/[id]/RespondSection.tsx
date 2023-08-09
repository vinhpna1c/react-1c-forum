''

import { useEffect, useState } from "react"
import { CommentRepository } from "@amityco/ts-sdk"
import { CommentItem } from "../../../components";
import AddCommentItem from "../../../components/Comment/AddCommentItem";
import LoadingIndicator from "../../../components/Status/LoadingIndicator";
import AmityService from "../../../services/amity/amity.service";
import { auth } from "../../../services/firebase/firebase.service";


type RespondSectionProps = {
    postID: string,
}

export default function RespondSection(props: RespondSectionProps) {
    const { postID } = props;
    const [isLoadingComment, setIsLoadingComent] = useState(true)
    const [comments, setComments] = useState<Amity.Comment[]>([]);
    const isAuthenticated = auth.currentUser != null;

    const getComments = () => {
        const queryParams: Amity.CommentLiveCollection = {
            referenceType: 'post',
            referenceId: postID,
            sortBy: 'lastCreated',
            limit: 20,
        }
        const unsubscribe = CommentRepository.getComments(queryParams,
            ({ data: comments, onNextPage, hasNextPage, loading, error }) => {
                setComments(comments);
                setIsLoadingComent(false);
            })
        unsubscribe();
    }

    useEffect(() => {
        AmityService.getAmityService().then((_) => {
            getComments();

        })

    }, []);
    return (
        <div className="flex flex-col py-2 border-t-2 border-[#3F4354]">

            {
                isAuthenticated
                    ? <AddCommentItem
                        PostID={postID}
                        callBack={(comment) => {
                            setComments(prev => [comment, ...prev])
                        }} />
                    : <h3>Đăng nhập để bình luận nhé</h3>
            }

            <div className="flex flex-col space-y-5">
                {
                    isLoadingComment
                        ? <LoadingIndicator />
                        : comments.map((comment, index) => {
                            return (
                                <CommentItem key={index} data={comment} callBack={() => { }}>
                                </CommentItem>
                            )
                        })
                }
            </div>

        </div>
    )
}