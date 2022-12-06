import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Problem } from '../../generics/Problem';
import { RootState } from '../store';
import { getProblems } from '../../features/DatabaseAPI/ProblemAPI';

export const getAllProblemsAsync = createAsyncThunk(
	'problem/fetchCollection',
	async () => {
		const problems = await getProblems();
		problems.forEach((problem) => (problem._id = problem?._id?.toString()));
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
