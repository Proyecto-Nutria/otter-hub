import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllProblemsAsync } from './slices/problemSlice';
import { Home } from './components/Home';
import { selectView, View } from './slices/viewSlice';

function App() {
	const dispatch = useAppDispatch();
	const view = useAppSelector(selectView);

	const currentView = (view: View) => {
		/* eslint-disable indent */
		switch (view) {
			case 'Home':
				return <Home />;
			default:
				return <></>;
		}
		/* eslint-enable indent */
	};
	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);

	return <div className='App'>{currentView(view)}</div>;
}

export default App;
