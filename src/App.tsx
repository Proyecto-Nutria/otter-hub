import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllProblemsAsync } from './slices/problemSlice';
import { Home } from './components/Home';
import { selectView, View } from './slices/viewSlice';
import { Outlet } from 'react-router-dom';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);

	return <div className='App'>{<Outlet />}</div>;
}

export default App;
