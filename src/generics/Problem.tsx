import { ProblemRank } from './ProblemRank';

export interface Problem {
	name: string;
	desc: string;
	company: string;
	difficulty: ProblemRank;
	position: string;
	input: string;
	output: string;
	code: string;
	tags: string[];
	_id?: string;
}
