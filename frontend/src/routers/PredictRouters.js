import React from "react";
import { Routes, Route } from "react-router-dom";

import HeartPredForm from "../pages/model/HeartPredForm";
import HeartPred from "../pages/model/HeartPred";

const PredictRouters = () => {
    return (
        <Routes>
            <Route path="/predict/heart_pred_form" element={<HeartPredForm />} />
            <Route path="/predict/result" element={<HeartPred />} />
        </Routes>
    );
};

export default PredictRouters;