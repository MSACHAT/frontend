export type BaseResponse<T> = {
    // success: boolean;
    error?: {

    };
    data?: T;
};

export type BasePageResponse<T>={
    totalPages:number;
    data:T[]
}