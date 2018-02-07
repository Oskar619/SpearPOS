export class GenericApiResponse{
    Success: boolean;
    Message: string;
}

export class GenericApiResponseWithResult<TResult> extends GenericApiResponse{
    Result: TResult;
}