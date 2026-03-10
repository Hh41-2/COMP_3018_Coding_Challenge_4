export interface ApiResponse<T> {
    message?: string;
    count?: number;
    data?: T;
    error?: string;
    code?: string;
}

export const generalResponse = <T>(
    message?: string,
    count?: number,
    data?: T 
): ApiResponse<T> => ({
    message,
    count,
    data
});

export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});