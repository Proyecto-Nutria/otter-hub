import React, { useCallback, useState } from 'react';
import { ArrowBackOutline } from 'react-ionicons';
import { canRegister, register } from '../../features/DatabaseAPI/UserAPI';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { FunctionEvent } from '../../generics/Events';
import { Button } from '../Button';
import { Nav } from '../Nav';
import bcrypt from 'bcryptjs';
import { User } from '../../generics/User';
import { UserCard } from './UserCard';

const styles: ComponentStyles = {
	container: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		height: '100vh',
		width: '100vw',
		background: COLORS.background,
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
	wrap: {
		display: 'flex',
		flexFlow: 'column',
		gap: 10,
		background: COLORS.white,
		height: 'fit-content',
		alignSelf: 'center',
		justifySelf: 'center',
		padding: '20px',
	},
};

export const Register = () => {
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [isSending, setIsSending] = useState(false);

	const setValue = useCallback(
		(event: FunctionEvent) => {
			/* eslint-disable indent */
			switch (event.currentTarget.name) {
				case 'user':
					setUser(event.currentTarget?.value);
					break;
				case 'password':
					setPassword(event.currentTarget?.value);
					break;
				default:
					break;
			}
			/* eslint-enable indent */
		},
		[setUser, setPassword]
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
		if (!(await canRegister(user))) {
			alert(`User -${user}- can not be created`);
		} else {
			const hash = bcrypt.hashSync(password, 10);
			let newUser: User = {
				user: user,
				canRegister: false,
				password: hash,
			};
			newUser = await register(newUser);
			alert(
				newUser
					? 'Successfully created user'
					: `User -${user}- can not be created`
			);
		}
		setIsSending(false);
	}, [user, isSending, setIsSending]);

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
				user={user}
				password={password}
				onChange={onChange}
				send={send}
			/>
		</div>
	);
};
