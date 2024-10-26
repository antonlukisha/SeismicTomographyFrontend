import { useRoutes } from 'react-router-dom';
import { commonRoutes } from './comon';

export const AppRoutes = () => {
    const router = useRoutes([...commonRoutes]);

    return <>{router}</>;
};