import { Box, Container } from "@mui/joy";
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar";

export const MainLayout = () => {
    return (
        <Container>
            <Outlet/>
            <Navbar />
        </Container>
    )
}