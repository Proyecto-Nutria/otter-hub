import React from 'react';
import ArrowForwardCircle from 'react-ionicons/lib/ArrowForwardCircle';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';
import { ProblemIcon, ProblemRank } from '../generics/ProblemRank';
import { Button } from './Button';
import { Pill } from './Pill';

const styles: ComponentStyles = {
	container: {
		display: 'flex',
		flexFlow: 'column',
		maxHeight: '300px',
		background: COLORS.white,
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		borderRadius: '25px',
		overflow: 'clip ',
	},
	desc: {
		textOverflow: 'ellipsis',
		textAlign: 'justify',
	},
	upper: {
		display: 'flex',
		height: '197px',
		flexDirection: 'column',
		gap: 10,
		overflow: 'clip ',
		padding: '24px',
		paddingBottom: 0,
		maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
		WebkitMaskImage:
			'linear-gradient(to bottom, black 90%, transparent 100%)',
	},
	cardHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	pills: {
		display: 'flex',
		gap: '1vw',
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		background: COLORS.background,
		padding: '20px',
	},
};

interface CardProps {
	tittle: string;
	tags: string[];
	desc: string;
	difficulty: ProblemRank;
	position: string;
	company: string;
}

export const Card = ({
	tittle,
	tags,
	desc,
	difficulty,
	company,
	position,
}: CardProps) => {
	return (
		<div style={styles.container}>
			<div style={styles.upper}>
				<div style={styles.cardHeader}>
					<h3>{tittle}</h3>
					<h3>{ProblemIcon[difficulty]}</h3>
				</div>
				<div style={styles.pills}>
					{tags.map((tag) => (
						<Pill key={tag} content={tag} />
					))}
				</div>
				<p style={styles.desc}>{desc}</p>
			</div>
			<div style={styles.footer}>
				<p>
					{company} - {position}
				</p>
				<Button color='action'>
					<p>Check it</p>
					<ArrowForwardCircle
						color={'#ffffff'}
						style={{
							display: 'flex',
							height: '20px',
							width: '20px',
						}}
					/>
				</Button>
			</div>
		</div>
	);
};
