import { Problem } from '../../generics/Problem';
import { getCollection } from './Common';

export const uploadProblem = async (problem: Problem) => {
	const collection = await getCollection(
		process.env.REACT_APP_COLLECTION_NAME as string
	);
	return await collection.insertOne(problem);
};

export const getProblems = async () => {
	const collection = await getCollection(
		process.env.REACT_APP_COLLECTION_NAME as string
	);
	return (await collection.find()) as Problem[];
};
