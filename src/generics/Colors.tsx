const PRIMARY = {
	black: '#1F1F1F',
	white:  '#FFFFFF',
	blue: '#2D9CDB',
	transparent: 'transparent'
};
export const COLORS = {
	...PRIMARY,
	secondary: PRIMARY.black,
	action: PRIMARY.blue 
};
export type Color = keyof typeof COLORS;