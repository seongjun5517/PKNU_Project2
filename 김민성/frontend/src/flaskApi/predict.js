import { flaskApi } from "../config/axiosInstance";

export const getHeartPredict = (features) =>
    flaskApi.post("/predict/heart_pred_form", features)