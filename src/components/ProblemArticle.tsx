import React from 'react';
import { COLORS } from '../generics/Colors';
import { ComponentStyles } from '../generics/ComponentStyles';
import { Problem } from '../generics/Problem';

interface ProblemArticleProps {
	problem: Problem;
}

const styles: ComponentStyles = {
	description: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'stretch',
		background: COLORS.white,
	},
	example: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: '4vw',
	},
};
export const ProblemArticle = ({ problem }: ProblemArticleProps) => {
	return (
		<article>
			<h2>{problem.name}</h2>
			<section style={styles.description}>
				<h3>Description</h3>
				{problem.desc}
			</section>
			<section style={styles.example}>
				<h3 style={{ gridColumn: '1/3' }}>Example</h3>
				<div>
					<h4>Input</h4>
					<p>{problem.input}</p>
				</div>
				<div>
					<h4>Output</h4>
					<p>{problem.output}</p>
				</div>
			</section>
			<section style={styles.description}>
				<h3>Code solution</h3>
				<p>{problem.code}</p>
			</section>
		</article>
	);
};
