import React from 'react';
import { ComponentStyles } from '../generics/ComponentStyles';

const styles: ComponentStyles = {
	container: {
		position: 'absolute',
		width: '100vw',
		height: '100%',
		zIndex: 1000,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(10, 10, 10, .3)',
		backdropFilter: 'blur(5px)',
	},
	loader: {
		position: 'absolute',
		width: '100%',
		height: '10vh',
		borderRadius: '50px',
		background: 'linear-gradient(45deg, #b6b5ff, #ff9797)',
		left: '100%',
		animation: 'load 3s linear infinite',
	},
	box: {
		position: 'relative',
		width: '80%',
		height: '10vh',
		borderRadius: '50px',
		overflow: 'hidden',
	},
};
export const LoadingBar = () => {
	return (
		<div style={styles.container}>
			<div style={styles.box}>
				<div style={styles.loader}></div>
			</div>
		</div>
	);
};
