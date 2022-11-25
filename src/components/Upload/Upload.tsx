import React, { useCallback, useState } from 'react';
import { ArrowBackOutline, Send, SendOutline } from 'react-ionicons';
import { uploadProblem } from '../../features/Problem/ProblemAPI';
import { COLORS } from '../../generics/Colors';
import { ComponentStyles } from '../../generics/ComponentStyles';
import { FunctionEvent } from '../../generics/Events';
import { Problem } from '../../generics/Problem';
import { ProblemRank } from '../../generics/ProblemRank';
import { Button } from '../Button';
import { Nav } from '../Nav';
import './Upload.css';

const styles: ComponentStyles = {
	main: {
		display: 'flex',
		flexFlow: 'column',
		height: '100%',
		padding: '16px 25px',
		gap: '10px',
		background: COLORS.background,
		minHeight: '100vh',
	},
	backArrow: {
		display: 'flex',
		height: '25px',
		width: '25px',
	},
};

export const Upload = () => {
	const [level, setLevel] = useState<ProblemRank>('easy');
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [description, setDescription] = useState('');
	const [input, setInput] = useState('');
	const [output, setOutput] = useState('');
	const [solution, setSolution] = useState('');
	const [position, setPosition] = useState('');
	const [tags, setTags] = useState('tag, tag, tag');
	const [isSending, setIsSending] = useState(false);
	const onChange = (event: FunctionEvent) => {
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
			default:
				break;
		}
		/* eslint-enable indent */
	};
	const autoFitContent = (event: FunctionEvent) => {
		event.currentTarget.style.height = '';
		event.currentTarget.style.height =
			event.currentTarget.scrollHeight + 'px';
	};

	const send = useCallback(
		async (event: FunctionEvent) => {
			if (isSending) return;
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
				tags: tags.split(',').map((tag) => tag.trim()),
			};
			const res = await uploadProblem(newProblem);
			console.log('res');
			console.log(res);
			setIsSending(false);
		},
		[isSending]
	);

	return (
		<>
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
				<label htmlFor='level'>
					<h3>Level</h3>
				</label>
				<select id='level' name='level' onChange={onChange}>
					<option value='hard'>Hard</option>
					<option value='medium'>Medium</option>
					<option value='easy'>Easy</option>
				</select>
				<label htmlFor='description'>
					<h3>Description</h3>
				</label>
				<textarea
					onInput={autoFitContent}
					id='description'
					name='description'
					value={description}
					onChange={onChange}
				/>
				<label htmlFor='input'>
					<h3>Input</h3>
				</label>
				<textarea
					onInput={autoFitContent}
					id='input'
					name='input'
					value={input}
					onChange={onChange}
				/>
				<label htmlFor='output'>
					<h3>Output</h3>
				</label>
				<textarea
					onInput={autoFitContent}
					id='output'
					name='output'
					value={output}
					onChange={onChange}
				/>
				<label htmlFor='solution'>
					<h3>Solution</h3>
				</label>
				<textarea
					onInput={autoFitContent}
					id='solution'
					name='solution'
					value={solution}
					onChange={onChange}
				/>
				<label htmlFor='tags'>
					<h3>Comma separated tags</h3>
				</label>
				<input
					id='tags'
					name='tags'
					type='text'
					value={tags}
					onChange={onChange}
				/>
				<br />
				<Button hasBorder color='action' onClick={send}>
					<p>Send</p>
					<Send
						color={'#ffffff'}
						title={'send'}
						style={styles.backArrow}
					/>
				</Button>
			</div>
		</>
	);
};
