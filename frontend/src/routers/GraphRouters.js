import React from "react";
import { Routes, Route } from "react-router-dom";

import GraphPage from "../pages/graph/GraphPage";

const GraphRouters = () => {
    return (
        <Routes>
            <Route path="/graph/view/:mem_id" element={<GraphPage />} />
        </Routes>
    );
};

export default GraphRouters;