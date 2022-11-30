import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AddCircleOutline from 'react-ionicons/lib/AddCircleOutline';
import ArrowBackOutline from 'react-ionicons/lib/ArrowBackOutline';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';
import { Problem } from '../generics/Problem';
import { getAllProblemsAsync, selectProblems } from '../slices/problemSlice';
import { changeView } from '../slices/viewSlice';
import { Button } from './Button';
import { Card } from './Card';
import { Nav } from './Nav';
import { ProblemArticle } from './ProblemArticle';

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

const HomeMobil = () => {
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

const styleLandscape: ComponentStyles = {
	container: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		height: '100vh',
		width: '100vw',
	},
	columns: {
		display: 'grid',
		gridTemplateColumns: '1fr 2fr',
		background: COLORS.background,
		borderRadius: '50px 0px 0px 0px',
		padding: '20px',
		gap: 20,
		overflow: 'scroll',
	},
	nav: {},
	row: {
		overflow: 'scroll',
		display: 'grid',
		gap: 20,
		alignContent: 'space-between',
		padding: '10px 0',
	},
};

const HomeLandscape = () => {
	const problems = useAppSelector(selectProblems);
	const problem = useMemo(() => problems[0], [problems]);
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
		<div style={styleLandscape.container}>
			<span style={styleLandscape.nav}>
				<Nav tittle='Otter-Hub' />
			</span>
			<div style={styleLandscape.columns}>
				<div
					style={{
						...styleLandscape.row,
						borderRadius: '50px 0px 0px 0px',
					}}>
					{getCollections()}
					<Button color='grey' hasBorder href='/upload'>
						<AddCircleOutline
							color={'#00000'}
							title={'Add a problem'}
							style={styles.backArrow}
						/>
					</Button>
				</div>
				<div style={styleLandscape.row}>
					{problem && <ProblemArticle problem={problem} />}
				</div>
			</div>
		</div>
	);
};

export const Home = () => {
	// const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const dispatch = useAppDispatch();

	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	useEffect(() => {
		dispatch(getAllProblemsAsync());
	}, []);
	return isPortrait ? <HomeMobil /> : <HomeLandscape />;
};
