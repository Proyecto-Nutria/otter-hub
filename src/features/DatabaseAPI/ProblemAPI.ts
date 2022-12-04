import { Problem } from '../../generics/Problem';
import * as Realm from 'realm-web';

const app = new Realm.App({
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	id: process.env.REACT_APP_MONGO_REALM_APP!,
});
export const uploadProblem = async (problem: Problem) => {
	const user = await app.logIn(Realm.Credentials.anonymous());
	const mongo = await user.mongoClient(
		process.env.REACT_APP_CLUSTER_NAME as string
	);
	const collection = await mongo
		.db(process.env.REACT_APP_DATABASE_NAME as string)
		.collection(process.env.REACT_APP_COLLECTION_NAME as string);
	return await collection.insertOne(problem);
};
