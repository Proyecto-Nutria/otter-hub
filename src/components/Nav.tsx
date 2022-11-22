import React from 'react';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';

interface NavProps {
	tittle: string
}
const styles:  ComponentStyles ={
	nav:{
		display: 'flex',
		padding: '0px 25px',
		background: COLORS.white,
		margin: 0
	}
};
export const Nav = ({tittle}: NavProps) => {
	return <nav>
		<h1 style={{
			margin: 0,
			fontWeight: 'bolder'
		}}>{tittle}</h1>
	</nav>;
};