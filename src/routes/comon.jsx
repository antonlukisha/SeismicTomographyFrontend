
import React from 'react';
import PrepareData from '../pages/PrepareData/PrepareData';
import Events from '../pages/Events/Events';
import Result from '../pages/Result/Result';
import { MainLayout } from '../components/Layouts/MainLayout';
import Tasks from '../pages/Tasks/Tasks';

export const commonRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Tasks /> },
            { path: 'prepare/*', element: <PrepareData /> },
            { path: 'events/*', element: <Events /> },
            { path: 'result/*', element: <Result /> }
        ]
    }
]