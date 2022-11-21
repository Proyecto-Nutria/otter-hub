import React, {  CSSProperties, ReactNode } from 'react';
import tinycolor from 'tinycolor2';
import { Color, COLORS } from '../generics/Colors';

interface ButtonProps{
	children?: ReactNode,
	color?:  Color, 
}

const style:  CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '12px 60px',
	border:  'none',
	borderRadius: 15,
	cursor: 'pointer',
	gap: 8,
	fontSize: 16
};

export const Button = ({
	color = 'transparent',
	children,
}:ButtonProps ) => {
	const fontColor =  tinycolor(color).isLight() ? COLORS.black : COLORS.white;
	return <button style={{
		...style, 
		backgroundColor: COLORS[color],
		color: fontColor}}>
		{children}
	</button>;
};