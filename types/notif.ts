export type NotifResponse<T>={
    data: T[];
    totalPages: number;
    totalNotifs: number;
}
export interface NotifModel{
    id: number;
    userName: string;
    commentContent: string;
    postId: number;
    senderId: number;
    timeStamp: number;
    receiverId: number;
    previewType: string;
    previewString: string;
    userAvatar: string;
}