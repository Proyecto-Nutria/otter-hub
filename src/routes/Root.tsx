import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllProblemsAsync } from '../slices/problemSlice';

export const Root = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);

	return (
		<div className='App'>
			<Outlet />
		</div>
	);
};
