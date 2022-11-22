const PRIMARY = {
	black: '#1F1F1F',
	white:  '#FFFFFF',
	blue: '#2D9CDB',
	grey: '#F7F7F7',
	transparent: 'transparent'
};
export const COLORS = {
	...PRIMARY,
	secondary: PRIMARY.black,
	action: PRIMARY.blue,
	background: PRIMARY.grey
};
export type Color = keyof typeof COLORS;