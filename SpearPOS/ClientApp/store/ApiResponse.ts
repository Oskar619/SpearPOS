export class GenericApiResponse{
    success: boolean;
    message: string;
}

export class GenericApiResponseWithResult<TResult> extends GenericApiResponse{
    result: TResult;
}