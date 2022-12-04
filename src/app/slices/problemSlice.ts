import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Problem } from '../../generics/Problem';
import * as Realm from 'realm-web';
import { RootState } from '../store';

const app = new Realm.App({
	id: process.env.REACT_APP_MONGO_REALM_APP!,
});

export const getAllProblemsAsync = createAsyncThunk(
	'problem/fetchCollection',
	async () => {
		const user = await app.logIn(Realm.Credentials.anonymous());
		const mongo = await user.mongoClient(
			process.env.REACT_APP_CLUSTER_NAME as string
		);
		const collection = await mongo
			.db(process.env.REACT_APP_DATABASE_NAME as string)
			.collection(process.env.REACT_APP_COLLECTION_NAME as string);
		const problems = await collection.find();
		problems.forEach((problem) => (problem._id = problem._id.toString()));
		return problems as Problem[];
	}
);
export interface ProblemsState {
	problems: Problem[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ProblemsState = {
	problems: [],
	status: 'idle',
};

export const problemsSlice = createSlice({
	name: 'problems',
	initialState,
	reducers: {
		setProblems: (state, action: PayloadAction<Problem[]>) => {
			state.problems = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProblemsAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getAllProblemsAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.problems = action.payload;
			})
			.addCase(getAllProblemsAsync.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { setProblems } = problemsSlice.actions;
export const selectProblems = (state: RootState) => state.problems.problems;
export const problemsReducer = problemsSlice.reducer;
