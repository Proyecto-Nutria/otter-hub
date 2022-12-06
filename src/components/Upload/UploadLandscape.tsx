import React, { useCallback, useEffect, useState } from 'react';
import { ArrowBackOutline, Send } from 'react-ionicons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, setStatus } from '../../app/slices/userSlice';
import { uploadProblem } from '../../features/DatabaseAPI/ProblemAPI';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { FunctionEvent } from '../../generics/Events';
import { Problem } from '../../generics/Problem';
import { ProblemRank } from '../../generics/ProblemRank';
import { Button } from '../Button';
import { Nav } from '../Nav';
import './Upload.css';

const styles: ComponentStyles = {
	container: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		height: '100vh',
		width: '100vw',
	},
	main: {
		display: 'grid',
		gridTemplateAreas: `
			'name name company company position position level'
			'description description description  input input output output'
			'solution solution solution solution solution solution solution'
			'tags tags tags language language button button'
	   `,
		gridTemplateRows: 'auto 1fr 1fr auto',
		gridTemplateColumns: 'repeat(7, 1fr)',
		padding: '16px 25px',
		gap: '10px',
		background: COLORS.background,
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
	mainPortrait: {
		display: 'grid',
	},
	text: {
		minHeight: '90%',
	},
};

export const UploadLandscape = () => {
	const USER = useAppSelector(selectUser);

	const [level, setLevel] = useState<ProblemRank>('easy');
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [description, setDescription] = useState('');
	const [input, setInput] = useState('');
	const [output, setOutput] = useState('');
	const [solution, setSolution] = useState('');
	const [position, setPosition] = useState('');
	const [language, setLanguage] = useState('');
	const [tags, setTags] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [isInvalid, setIsInvalid] = useState(true);
	const dispatch = useAppDispatch();

	const values = [
		level,
		name,
		company,
		description,
		input,
		output,
		solution,
		position,
		tags,
	];

	const setValue = useCallback(
		(event: FunctionEvent) => {
			/* eslint-disable indent */
			switch (event.currentTarget.name) {
				case 'name':
					setName(event.currentTarget?.value);
					break;
				case 'company':
					setCompany(event.currentTarget?.value);
					break;
				case 'position':
					setPosition(event.currentTarget?.value);
					break;
				case 'level':
					setLevel(event.currentTarget?.value as ProblemRank);
					break;
				case 'description':
					setDescription(event.currentTarget?.value);
					break;
				case 'input':
					setInput(event.currentTarget?.value);
					break;
				case 'output':
					setOutput(event.currentTarget?.value);
					break;
				case 'solution':
					setSolution(event.currentTarget?.value);
					break;
				case 'tags':
					setTags(event.currentTarget?.value);
					break;
				case 'language':
					setLanguage(event.currentTarget?.value);
					break;
				default:
					break;
			}
			/* eslint-enable indent */
		},
		[
			setName,
			setCompany,
			setPosition,
			setLevel,
			setDescription,
			setInput,
			setOutput,
			setSolution,
			setTags,
		]
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

	useEffect(() => {
		if (isSending) dispatch(setStatus('loading'));
		else dispatch(setStatus('idle'));
	}, [isSending]);

	const send = useCallback(async () => {
		if (isSending || isInvalid) return;
		setIsSending(true);
		const newProblem: Problem = {
			name,
			desc: description,
			company,
			difficulty: level,
			position,
			input,
			output,
			code: solution,
			language,
			user: USER!.user,
			tags: tags.split(',').map((tag) => tag.trim()),
		};
		await uploadProblem(newProblem);
		setIsSending(false);
	}, [isSending, isInvalid, setIsSending]);

	useEffect(() => {
		setIsInvalid(values.some((value) => value === ''));
	}, [setIsInvalid, ...values]);

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
			<div style={styles.main}>
				<span style={{ gridArea: 'name' }}>
					<label htmlFor='name'>
						<h3>Problem name</h3>
					</label>
					<input
						id='name'
						name='name'
						type='text'
						value={name}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'company' }}>
					<label htmlFor='company'>
						<h3>Company</h3>
					</label>
					<input
						id='company'
						name='company'
						type='text'
						value={company}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'position' }}>
					<label htmlFor='position'>
						<h3>Position</h3>
					</label>
					<input
						id='position'
						name='position'
						type='text'
						value={position}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'level' }}>
					<label htmlFor='level'>
						<h3>Level</h3>
					</label>
					<select id='level' name='level' onChange={onChange}>
						<option value='hard'>Hard</option>
						<option value='medium'>Medium</option>
						<option value='easy'>Easy</option>
					</select>
				</span>
				<span style={{ gridArea: 'description' }}>
					<label htmlFor='description'>
						<h3>Description</h3>
					</label>
					<textarea
						style={styles.text}
						id='description'
						name='description'
						value={description}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'input' }}>
					<label htmlFor='input'>
						<h3>Input</h3>
					</label>
					<textarea
						style={styles.text}
						id='input'
						name='input'
						value={input}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'output' }}>
					<label htmlFor='output'>
						<h3>Output</h3>
					</label>
					<textarea
						style={styles.text}
						id='output'
						name='output'
						value={output}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'solution' }}>
					<label htmlFor='solution'>
						<h3>Solution</h3>
					</label>
					<textarea
						style={styles.text}
						id='solution'
						name='solution'
						value={solution}
						onChange={onChange}
					/>
				</span>
				<span style={{ gridArea: 'language' }}>
					<label htmlFor='language'>
						<h3>Language</h3>
					</label>
					<input
						id='language'
						name='language'
						type='text'
						value={language}
						onChange={onChange}
						placeholder='python'
					/>
				</span>
				<span style={{ gridArea: 'tags' }}>
					<label htmlFor='tags'>
						<h3>Comma separated tags</h3>
					</label>
					<input
						id='tags'
						name='tags'
						type='text'
						value={tags}
						onChange={onChange}
						placeholder='tag, tag, tag'
					/>
				</span>
				<span
					style={{
						display: 'flex',
						gridArea: 'button',
						justifyContent: 'flex-end',
					}}>
					<Button
						hasBorder
						color={isInvalid ? 'grey' : 'action'}
						onClick={send}>
						<p style={{ width: '250px' }}>Send</p>
						<Send
							color={'#ffffff'}
							title={'send'}
							style={styles.backArrow}
						/>
					</Button>
				</span>
			</div>
		</div>
	);
};
