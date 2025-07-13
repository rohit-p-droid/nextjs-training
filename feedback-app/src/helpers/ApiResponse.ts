interface response {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: any;
}

export function ApiResponse({
    statusCode,
    success,
    message = "success",
    data
}: response) {
    const responseObj: response = {
        statusCode,
        success,
        message,
    }

    if(data) {
        responseObj.data = data
    }

    return Response.json(
        responseObj,
        {
            status: statusCode
        }
    )
}