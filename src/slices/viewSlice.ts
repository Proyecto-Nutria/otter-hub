import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type View = 'Home' | 'Upload';
export interface ViewState {
	view: View;
	status: 'idle' | 'loading' | 'failed';
}
const initialState: ViewState = {
	view: 'Home',
	status: 'idle',
};
export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		changeView: (state, action: PayloadAction<View>) => {
			state.view = action.payload;
		},
	},
});
export const { changeView } = viewSlice.actions;
export const viewReducer = viewSlice.reducer;
export const selectView = (state: RootState) => state.view.view;
