import { Owner } from "./owner";

export interface Post {
    Owner?:           Owner;
    Settings?:        string;
    PostType?:        string;
    Content?:         string;
    Title?:           string;
    Multimedia?:      Multimedia[];
    Description?:     string;
    CreatedAt?:       string;
    IsPublic?:        string;
    CountReactition?: number|string;
    CommentCount?:    number|string;
    Code?:            string;
}

export interface Multimedia {
    MultimediaURL?: string;
}

