import { Box } from "@mui/joy";
import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {

    const taskId = useLocation().pathname.split`/`.at(-1)
    
    return (
        <Box>Result</Box>
    );
}

export default Result;