import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../generics/User';
import { RootState } from '../store';

export interface UserState {
	user: User | undefined;
	status: 'idle' | 'loading' | 'failed';
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
	},
});

export const { setUser } = counterUser.actions;
export const selectUser = (state: RootState) => state.user.user;
export const userReducer = counterUser.reducer;
