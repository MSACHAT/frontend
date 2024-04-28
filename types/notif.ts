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

export interface NotifComponentProps{
    messageType:string;
    userIcon:string;
    userName:string;
    sendTime:string;
    commentContent:string;
    previewType:string;
    previewString:string;
    isRead:boolean;
}
export type NotifSwrResponse<T>={
    notifs:T[];
    totalNotifs:number;
    totalPages:number;
}
export type NotifDataResponse<T>={
    data:T
}