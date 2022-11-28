import React, { useCallback, useState } from 'react';
import AddCircleOutline from 'react-ionicons/lib/AddCircleOutline';
import ArrowBackOutline from 'react-ionicons/lib/ArrowBackOutline';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';
import { Problem } from '../generics/Problem';
import { selectProblems } from '../slices/problemSlice';
import { changeView } from '../slices/viewSlice';
import { Button } from './Button';
import { Card } from './Card';
import { Nav } from './Nav';
import { ProblemArticle } from './ProblemArticle';

const styles: ComponentStyles = {
	main: {
		display: 'flex',
		flexFlow: 'column',
		height: '100%',
		padding: '16px 25px',
		gap: '10px',
		background: COLORS.background,
		borderRadius: '50px 0px 0px 0px',
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
};

export const Home = () => {
	const dispatch = useAppDispatch();
	const problems = useAppSelector(selectProblems);
	const [problem, setProblem] = useState<Problem | null>(null);

	const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

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
								onClick={() => dispatch(changeView('Upload'))}
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
