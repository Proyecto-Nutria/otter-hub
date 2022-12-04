import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { getAllProblemsAsync } from './app/slices/problemSlice';
import { Outlet } from 'react-router-dom';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);

	return <div className='App'>{<Outlet />}</div>;
}

export default App;
