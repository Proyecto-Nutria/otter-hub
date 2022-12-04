import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './Upload.css';
import { UploadLandscape } from './UploadLandscape';
import { UploadPortrait } from './UploadPortrait';

export const Upload = () => {
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	return isPortrait ? <UploadPortrait /> : <UploadLandscape />;
};
