import React from 'react';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';

interface NavProps {
	tittle: string;
	leftChildren?: React.ReactNode;
	rightChildren?: React.ReactNode;
}
const styles: ComponentStyles = {
	nav: {
		display: 'flex',
		padding: '0px 25px',
		background: COLORS.white,
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 0,
	},
};
export const Nav = ({ tittle, leftChildren, rightChildren }: NavProps) => {
	return (
		<nav style={styles.nav}>
			{leftChildren}
			<h1
				style={{
					margin: 0,
					fontWeight: 'bolder',
				}}>
				{tittle}
			</h1>
			{rightChildren}
		</nav>
	);
};
