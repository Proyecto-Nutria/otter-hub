import * as Realm from 'realm-web';
import { User } from '../../generics/User';
// TODO only allow this operation with user and not anon
const app = new Realm.App({
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	id: process.env.REACT_APP_MONGO_REALM_APP!,
});
const getCollection = async (collectionName: string) => {
	const user = await app.logIn(Realm.Credentials.anonymous());
	const mongo = await user.mongoClient(
		process.env.REACT_APP_CLUSTER_NAME as string
	);
	const collection = await mongo
		.db(process.env.REACT_APP_DATABASE_NAME as string)
		.collection(collectionName);
	return collection;
};

export const getUser = async (userName: string) => {
	const collection = await getCollection(
		process.env.REACT_APP_COLLECTION_USERS as string
	);
	const res = (await collection.findOne({ user: userName })) as User | null;
	return res;
};

export const canRegister = async (userName: string) => {
	const user = await getUser(userName);
	return user?.canRegister;
};

export const register = async (user: User) => {
	const collection = await getCollection(
		process.env.REACT_APP_COLLECTION_USERS as string
	);
	const newUser = (await collection.updateOne(
		{ user: user.user },
		{ ...user }
	)) as unknown;
	return newUser as User;
};
