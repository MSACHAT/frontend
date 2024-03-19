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
