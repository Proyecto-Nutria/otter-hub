import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from '../../app/hooks';
import { getAllProblemsAsync } from '../../app/slices/problemSlice';
import { HomeLandscape } from './HomeLandscape';
import { HomePortrait } from './HomePortrait';

export const Home = () => {
	// const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const dispatch = useAppDispatch();

	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);
	return isPortrait ? <HomePortrait /> : <HomeLandscape />;
};
