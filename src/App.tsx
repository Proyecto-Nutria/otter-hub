import React from 'react';
import ArrowForwardCircle from 'react-ionicons/lib/ArrowForwardCircle';
import './App.css';
import { Button } from './components/Button';
import { Pill } from './components/Pill';

function App() {
	return (
		<div className="App">
			<Pill content='Meta'/>
			<Button color='action'>
				<p>
					Solve
				</p>
				<ArrowForwardCircle
					color={'#ffffff'} 
					style={{
						display: 'flex',
						height: '20px',
						width: '20px',
					}}
				/>
			</Button>
		</div>
	);
}

export default App;
