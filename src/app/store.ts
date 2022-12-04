import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { problemsReducer } from './slices/problemSlice';
import { viewReducer } from './slices/viewSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		problems: problemsReducer,
		view: viewReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
