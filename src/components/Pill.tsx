import React from 'react';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';

interface PillProps {
	content: string;
}

const styles: ComponentStyles = {
	container: {
		display: 'flex',
		width: 'fit-content',
		padding: '4px 8px',
		background: COLORS.secondary,
		color: COLORS.white,
		borderRadius: '99px',
		fontFamily: 'Space Mono',
	},
	text: {
		fontSize: 'var(--small-text)',
	},
};

export const Pill = ({ content }: PillProps) => {
	return (
		<div style={styles.container}>
			<p style={styles.text}>{content}</p>
		</div>
	);
};
