// small processing bussiness or basic logic

import { CommentData } from "../../models/comment/comment";
import DateTimePattern from '../../models/constants/DateTimePattern';
import moment from "moment";

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

export {
    countComments,
    formatDateInput,
    formatDate,
};
