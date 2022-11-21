
import React, { CSSProperties } from 'react';
import { ComponentStyles } from '../generics/ComponentStyles';
import { ProblemRank } from '../generics/ProblemRank';

const styles:  ComponentStyles ={
	container : {
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	cardHeader:{},
	pills:{},
	footer: {}
};

interface CardProps {
	tittle: string,
	tags: [string],
	desc: string,
	rank: ProblemRank,
	company: string,
	position: string,
}

export const Card = ({tittle}: CardProps) => {

	

	return <div style={styles.container}>
		<div style={styles.cardHeader}>
			<h3>{tittle}</h3>
			<i></i>
		</div>
		<div style={styles.pills}></div>
		<p></p>
		<div style={styles.footer}></div>
	</div>;
};