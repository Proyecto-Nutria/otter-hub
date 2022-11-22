import React, { useCallback } from 'react';
import { useAppSelector } from '../app/hooks';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';
import { selectProblems } from '../slices/problemSlice';
import { Card } from './Card';
import { Nav } from './Nav';

const styles: ComponentStyles = {
	main: {
		display: 'grid',
		gridTemplateColumns: '1fr 2fr',
		height: '100%',
		padding: '16px 25px',
		gap: '44px',
		background: COLORS.background,
		borderRadius: '50px 0px 0px 0px',
	},
};

export const Home = () => {
	const problems = useAppSelector(selectProblems);
	const getCollections = useCallback(() => {
		return (
			<>
				{problems.map((problem) => (
					<Card
						key={problem.name}
						tittle={problem.name}
						difficulty={problem.difficulty}
						desc={problem.desc}
						company={problem.company}
						position={problem.position}
						tags={problem.tags}
					/>
				))}
			</>
		);
	}, [problems]);
	return (
		<>
			<Nav tittle='Otter-Hub' />
			<div style={styles.main}>
				<div>{getCollections()}</div>
				<div></div>
			</div>
		</>
	);
};
