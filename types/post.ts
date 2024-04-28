export interface PostModel {
    userName:string;
    "id": number;
    "content"?:string;
    "images"?: string[]
    "timeStamp": string;
    "likeCount": number;
    "commentCount": number;
    "isLiked": boolean;
    "userId": number;
    "avatar": string,
}
export type PostSwrResponse<T>={
    posts:T[];
    totalPages:number;
}
export type PostDataResponse<T>={
    data:T
}