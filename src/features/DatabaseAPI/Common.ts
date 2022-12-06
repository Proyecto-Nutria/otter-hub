import * as Realm from 'realm-web';

const app = new Realm.App({
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	id: process.env.REACT_APP_MONGO_REALM_APP!,
});

const getUser = async () => {
	console.log(app);
	try {
		const credentials = Realm.Credentials.apiKey(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			process.env.REACT_APP_OTTER_HUB_API_KEY!
		);
		const user = await app.logIn(credentials);
		console.table({
			credentials,
			key: process.env.REACT_APP_OTTER_HUB_API_KEY,
			user,
		});
		return user;
	} catch (err) {
		console.error('Failed to log in', err);
	}
};

export const getCollection = async (collectionName: string) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const user = await getUser();
	const mongo = await user?.mongoClient(
		process.env.REACT_APP_CLUSTER_NAME as string
	);
	const collection = await mongo!
		.db(process.env.REACT_APP_DATABASE_NAME as string)
		.collection(collectionName);
	return collection;
};
