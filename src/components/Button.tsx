import React, { CSSProperties, ReactNode } from 'react';
import tinycolor from 'tinycolor2';
import { Color, COLORS } from '../generics/Colors';
import { FunctionEvent } from '../generics/Events';

interface ButtonProps {
	children?: ReactNode;
	color?: Color;
	onClick?: (event: FunctionEvent) => void;
	hasBorder?: boolean;
	href?: string;
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
	href,
}: ButtonProps) => {
	const fontColor =
		tinycolor(color).isLight() || color == 'transparent'
			? COLORS.black
			: COLORS.white;
	const _style = {
		...style,
		backgroundColor: COLORS[color],
		color: fontColor,
		boxShadow: hasBorder ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none ',
	};
	return href ? (
		<a style={_style} href={href}>
			{children}
		</a>
	) : (
		<button style={_style} onClick={onClick}>
			{children}
		</button>
	);
};
