import React, { useCallback, useEffect, useState } from 'react';
import { AddCircleOutline } from 'react-ionicons';
import { useAppSelector } from '../../app/hooks';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { selectProblems } from '../../app/slices/problemSlice';
import { Button } from '../Button';
import { Card } from '../Card';
import { Nav } from '../Nav';
import { ProblemArticle } from '../ProblemArticle';
import { Problem } from '../../generics/Problem';

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
		overflowY: 'scroll',
	},
	nav: {},
	row: {
		overflowY: 'scroll',
		display: 'grid',
		gap: 20,
		alignContent: 'space-between',
		padding: '10px 0',
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
};
export const HomeLandscape = () => {
	const problems = useAppSelector(selectProblems);
	const [problem, setProblem] = useState<Problem | null>(null);
	useEffect(() => {
		setProblem(problems[0]);
	}, [problems]);

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
							style={styleLandscape.backArrow}
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
