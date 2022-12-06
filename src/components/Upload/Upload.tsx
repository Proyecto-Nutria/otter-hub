import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectStatus, selectUser } from '../../app/slices/userSlice';
import { LoadingBar } from '../LoadingBar';
import './Upload.css';
import { UploadLandscape } from './UploadLandscape';
import { UploadPortrait } from './UploadPortrait';

export const Upload = () => {
	const navigate = useNavigate();
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	const USER = useAppSelector(selectUser);
	const STATUS = useAppSelector(selectStatus);

	useEffect(() => {
		if (USER === undefined) navigate('/login');
	}, [USER]);

	return (
		<>
			{STATUS === 'loading' && <LoadingBar />}
			{isPortrait ? <UploadPortrait /> : <UploadLandscape />}
		</>
	);
};
