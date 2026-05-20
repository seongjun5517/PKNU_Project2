import { springApi } from "../config/axiosInstance";

export const getDataView = (mem_id) => 
    springApi.get(`/modeldata/view/${mem_id}`)
