// small processing bussiness or basic logic

import { useLocation } from "react-router-dom";
import { CommentData } from "../../models/comment/comment";
import DateTimePattern from '../../models/constants/DateTimePattern';
import moment from "moment";
import React from "react";

const countComments = (commentList: CommentData[]) => {
    let count = 0;
    commentList.forEach((comment) => {
        return count += (1 + countComments(comment.RepComment ?? []));
    });
    return count;
}

const formatDateInput = (timestamp: number) => {
    const date = new Date(timestamp);

    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}
const formatDate = (val: string | number, pattern: DateTimePattern) => {
    return moment(val).format(pattern.toString());
}

const useSearchParams = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search])
}

export {
    countComments,
    formatDateInput,
    formatDate,
    useSearchParams,
};
