export interface IGenericResponse<T>
{
    isSuccess: boolean,
    data: T,
    message: string
}