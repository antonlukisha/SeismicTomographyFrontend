
import React from 'react';
import PrepareData from '../pages/PrepareData/PrepareData';
import Events from '../pages/Events/Events';
import Result from '../pages/Result/Result';
import { MainLayout } from '../components/Layouts/MainLayout';
import Tasks from '../pages/Tasks/Tasks';
import Login from '../pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/Protected/ProtectedPage';

export const commonRoutes = [
    { path: '/login', element: <Login /> },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Tasks /> },
            { path: 'prepare/*', element: <PrepareData /> },
            { path: 'events/*', element: <Events /> },
            { path: 'result/*', element: <Result /> },
            // { path: 'login', element: <Login />},
            { path: 'protected', element: (
                <ProtectedRoute>
                    <ProtectedPage />
                </ProtectedRoute>
            )}
        ]
    }
]