import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import List from '../pages/manage/List';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
const routers = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Home /> },

			{
				path: 'manage',
				element: <ManageLayout />,
				children: [
					{ path: 'list', element: <List /> },
					{ path: 'trash', element: <Trash /> },
					{ path: 'star', element: <Star /> }
				]
			}
		]
	},
	{ path: '/register', element: <Register /> },
	{ path: '/login', element: <Login /> },
	{
		path: 'question',
		element: <QuestionLayout />,
		children: [
			{ path: 'edit/:id', element: <Edit /> },
			{ path: 'stat/:id', element: <Stat /> }
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]);
export default routers;
export const REGISTER_PATH = '/register';
export const LOGIN_PAHT = '/login';
export const HOME_PATH = '/';
export const MANAGE_INDEX_PATH = '/manage/list';
export function isNeeduser(path: string) {
	if ([REGISTER_PATH, LOGIN_PAHT, HOME_PATH].includes(path)) {
		return true;
	}
	return false;
}
