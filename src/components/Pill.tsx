import React, { CSSProperties } from 'react';
import { COLORS } from '../generics/Colors';

interface PillProps {
	content: string;
}

const style: CSSProperties = {
	display: 'flex',
	width: 'fit-content',
	padding: '4px 8px',
	background: COLORS.secondary,
	color: COLORS.white,
	borderRadius: '99px',
	fontFamily: 'Space Mono',
	fontSize: 16
};

export const Pill = ({content}: PillProps) => {
	return <div style={style}>
		{content}
	</div>;	
};