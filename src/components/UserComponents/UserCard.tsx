import React, { useEffect, useState } from 'react';
import { Send } from 'react-ionicons';
import { useMediaQuery } from 'react-responsive';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { FunctionEvent } from '../../generics/Events';
import { Button } from '../Button';

interface UserCardProps {
	user: string;
	password: string;
	onChange: (event: FunctionEvent) => void;
	send: () => void;
}
const styles: ComponentStyles = {
	wrap: {
		display: 'flex',
		flexFlow: 'column',
		gap: 10,
		background: COLORS.white,
		height: 'fit-content',
		alignSelf: 'center',
		justifySelf: 'center',
		padding: '20px',
		borderRadius: '25px',
	},
	logo: {
		height: '25vh',
	},
};
export const UserCard = ({ user, password, onChange, send }: UserCardProps) => {
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	const values = [user, password];
	const [isInvalid, setIsInvalid] = useState(true);

	useEffect(() => {
		setIsInvalid(values.some((value) => value === ''));
	}, [setIsInvalid, ...values]);

	const wrap = {
		...styles.wrap,
		width: isPortrait ? '80%' : '40%',
	};
	return (
		<div style={wrap}>
			<img
				style={styles.logo}
				src='nutria_escom_transparente_circular.svg'
				alt='logo'
			/>
			<span style={{ gridArea: 'user' }}>
				<label htmlFor='user'>
					<h3>User name</h3>
				</label>
				<input
					id='user'
					name='user'
					type='text'
					value={user}
					onChange={onChange}
				/>
			</span>
			<span style={{ gridArea: 'password' }}>
				<label htmlFor='password'>
					<h3>Password</h3>
				</label>
				<input
					id='password'
					name='password'
					type='password'
					value={password}
					onChange={onChange}
				/>
			</span>
			<Button
				hasBorder
				color={isInvalid ? 'grey' : 'action'}
				onClick={isInvalid ? undefined : send}>
				<p style={{ width: '100%' }}>Send</p>
				<Send
					color={'#ffffff'}
					title={'send'}
					style={styles.backArrow}
				/>
			</Button>
		</div>
	);
};
