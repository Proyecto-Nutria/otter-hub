import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../generics/User';
import { RootState } from '../store';

type Status = 'idle' | 'loading' | 'failed';
export interface UserState {
	user: User | undefined;
	status: Status;
}

const initialState: UserState = {
	user: undefined,
	status: 'idle',
};

export const counterUser = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setStatus: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
	},
});

export const { setUser, setStatus } = counterUser.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectStatus = (state: RootState) => state.user.status;
export const userReducer = counterUser.reducer;
