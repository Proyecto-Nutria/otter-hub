import React, { CSSProperties, ReactNode } from 'react';
import tinycolor from 'tinycolor2';
import { Color, COLORS } from '../generics/Colors';

interface ButtonProps {
	children?: ReactNode;
	color?: Color;
	onClick?: () => void;
	hasBorder?: boolean;
}

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '12px 3vw',
	border: 'none',
	borderRadius: 15,
	cursor: 'pointer',
	gap: 8,
};

export const Button = ({
	color = 'transparent',
	children,
	onClick,
	hasBorder,
}: ButtonProps) => {
	const fontColor =
		tinycolor(color).isLight() || color == 'transparent'
			? COLORS.black
			: COLORS.white;
	return (
		<button
			style={{
				...style,
				backgroundColor: COLORS[color],
				color: fontColor,
				boxShadow: hasBorder
					? '0px 4px 4px rgba(0, 0, 0, 0.25)'
					: 'none ',
			}}
			onClick={onClick}>
			{children}
		</button>
	);
};
