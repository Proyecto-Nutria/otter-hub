import React, { useCallback, useState } from 'react';
import { ArrowBackOutline } from 'react-ionicons';
import { getUser } from '../../features/DatabaseAPI/UserAPI';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { FunctionEvent } from '../../generics/Events';
import { Button } from '../Button';
import { Nav } from '../Nav';
import { UserCard } from './UserCard';
import bcrypt from 'bcryptjs';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../app/slices/userSlice';
import { redirect } from 'react-router-dom';

const styles: ComponentStyles = {
	container: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		height: '100vh',
		width: '100vw',
		background: COLORS.background,
	},
};
export const Login = () => {
	const dispatch = useAppDispatch();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isSending, setIsSending] = useState(false);

	const setValue = useCallback(
		(event: FunctionEvent) => {
			/* eslint-disable indent */
			switch (event.currentTarget.name) {
				case 'user':
					setUserName(event.currentTarget?.value);
					break;
				case 'password':
					setPassword(event.currentTarget?.value);
					break;
				default:
					break;
			}
			/* eslint-enable indent */
		},
		[setUserName, setPassword]
	);
	const onChange = useCallback(
		(event: FunctionEvent) => {
			const isValid = event.currentTarget?.value != '';
			setValue(event);
			if (isValid) {
				event.currentTarget.classList.remove('invalid');
			} else {
				event.currentTarget.classList.add('invalid');
			}
		},
		[setValue]
	);
	const send = useCallback(async () => {
		if (isSending) return;
		setIsSending(true);
		const user = await getUser(userName);
		const correctPassword = bcrypt.compareSync(
			password,
			user?.password || ''
		);
		console.table({
			...user,
			correctPassword,
		});
		if (!user || !correctPassword) {
			alert('User or password is incorrect');
		} else {
			dispatch(setUser(user));
			alert('User or password is correct');
			redirect('/');
		}
		setIsSending(false);
	}, [userName, isSending, setIsSending]);
	return (
		<div style={styles.container}>
			<Nav
				tittle='Otter-Hub'
				leftChildren={
					<Button href='/'>
						<ArrowBackOutline
							style={styles.backArrow}
							color={'#00000'}
							title={'go back'}
						/>
					</Button>
				}
			/>
			<UserCard
				user={userName}
				password={password}
				onChange={onChange}
				send={send}
			/>
		</div>
	);
};
