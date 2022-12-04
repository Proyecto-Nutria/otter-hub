import React, { useCallback, useState } from 'react';
import { AddCircleOutline, ArrowBackOutline } from 'react-ionicons';
import { useAppSelector } from '../../app/hooks';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { Problem } from '../../generics/Problem';
import { selectProblems } from '../../app/slices/problemSlice';
import { Button } from '../Button';
import { Card } from '../Card';
import { Nav } from '../Nav';
import { ProblemArticle } from '../ProblemArticle';

const styles: ComponentStyles = {
	main: {
		display: 'flex',
		flexFlow: 'column',
		height: '100vh',
		padding: '16px 25px',
		gap: '10px',
		background: COLORS.background,
		borderRadius: '50px 0px 0px 0px',
		overflow: 'scroll',
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
};

export const HomePortrait = () => {
	const problems = useAppSelector(selectProblems);
	const [problem, setProblem] = useState<Problem | null>(null);

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
						onClick={() => setProblem(problem)}
					/>
				))}
			</>
		);
	}, [problems]);
	return (
		<>
			<Nav
				tittle='Otter-Hub'
				leftChildren={
					<Button onClick={() => setProblem(null)}>
						<ArrowBackOutline
							style={styles.backArrow}
							color={'#00000'}
							title={'go back'}
						/>
					</Button>
				}
			/>
			<div
				style={{
					...styles.main,
					padding: problem ? '16px 0px' : styles.main.padding,
				}}>
				{problem == null ? (
					<>
						<div>{getCollections()}</div>
						<Button color='grey' hasBorder href='/upload'>
							<AddCircleOutline
								color={'#00000'}
								title={'Add a problem'}
								style={styles.backArrow}
							/>
						</Button>
					</>
				) : (
					<ProblemArticle problem={problem} />
				)}
			</div>
		</>
	);
};
