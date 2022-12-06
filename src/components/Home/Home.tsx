import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	getAllProblemsAsync,
	selectProblems,
} from '../../app/slices/problemSlice';
import { LoadingBar } from '../LoadingBar';
import { HomeLandscape } from './HomeLandscape';
import { HomePortrait } from './HomePortrait';

export const Home = () => {
	// const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const dispatch = useAppDispatch();
	const problems = useAppSelector(selectProblems);
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);
	return (
		<>
			{problems.length === 0 && <LoadingBar />}
			{isPortrait ? <HomePortrait /> : <HomeLandscape />}
		</>
	);
};
