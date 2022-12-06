import { User } from '../../generics/User';
import { getCollection } from './Common';

export const getUser = async (userName: string) => {
	const collection = await getCollection(
		process.env.REACT_APP_COLLECTION_USERS as string
	);
	const res = (await collection.findOne({ user: userName })) as User | null;
	if (res) res._id = res._id?.toString();
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
