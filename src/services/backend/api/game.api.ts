import { baseAxios } from "./axios.api"
import { API_URL, BaseApiResponse, Signature } from "./constants.api"


export type SaveRequestBody = Signature;
export type SaveResponseData = BaseApiResponse;

export const save = async (
    body: SaveRequestBody
): Promise<SaveResponseData> => {
    const { data } = await baseAxios.post(`${API_URL}/game/save`, body)
    return data
}
