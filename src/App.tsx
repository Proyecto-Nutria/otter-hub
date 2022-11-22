import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Card } from './components/Card';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllProblemsAsync, selectProblems } from './slices/problemSlice';
import { Home } from './components/Home';

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);

	return (
		<div className='App'>
			<Home />
		</div>
	);
}

export default App;
