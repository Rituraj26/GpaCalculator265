import React from 'react';
import Category from './Category';
import RenderSub from './RenderSub';
import OtherDept from './OtherDept';
import Cgpa from './Cgpa';
import '../stylesheets/App.css';

class App extends React.Component {
	state = {
		dept: '', 
		sem: '', 
		ch: '',
		subjects: {
			first: {0: 'Basic Electrical Engineering', 1: 'Engineering Mathematics - I', 2: 'Engineering Chemistry', 3: 'Problem Solving Techniques', 4: 'Fundamentals of Programming', 5: 'Physics  of Engineering Materials', 6: 'Programming in C Lab', 7: 'Basics of Computing'},
			second: {0: 'Environmental Science and Engineering', 1: 'Data Structures', 2: 'Chemistry of Electronic Materials', 3: 'English for Science and Technology', 4: 'Physics for Electronic Devices', 5: 'Engineering Mathematics II', 6: 'Engineering Physics Lab', 7: 'Engineering Chemistry Lab', 8: 'Data Structures Lab'},
			third: {0: 'Discrete Mathematics and Numerical Methods', 1: 'Object Oriented Programming', 2: 'Fundamentals of Digital Systems', 3: 'Object Oriented Programming Lab', 4: 'Advanced Data Structures', 5: 'Theory of Computation', 6: 'Electronic Devices', 7: 'Electronic Devices and Digital Systems Lab'},
			fourth: {0: 'Design and Analysis of Algorithm', 1: 'Computer Architecture & Organisation', 2: 'Database Management System', 3: 'Microprocessor & Microcontroller Based Systems', 4: 'Probability and Statistics', 5: 'RDBMS Lab', 6: 'Microprocessor & Microcontroller Lab', 7: 'Programming in Java'},
			fifth: {0: 'Operating System', 1: 'Computer Graphics and Multimedia Systems', 2: 'Compiler Design', 3: 'Software Engineering', 4: 'Computer Networks', 5: 'Operating System Lab', 6: 'Compiler Lab', 7: 'Networking Lab', 8: 'Professional Training - I'},
			sixth: {0: 'Object Oriented Analysis and Design', 1: 'Network Security', 2: 'Data Mining and Data Warehousing', 3: 'Cloud Computing', 4: 'Machine Learning', 5: 'Python Programming / R Programming / Internet of Things', 6: 'OOAD Lab', 7: 'Machine Learning Lab'}
		},
		credits: {
			first: [3, 4, 3, 3, 3, 3, 2, 2],
			second: [3, 3, 3, 3, 3, 4, 1, 1, 2],
			third: [4, 3, 3, 2, 3, 4, 3, 2],
			fourth: [3, 3, 3, 3, 4, 2, 2, 4],
			fifth: [3, 3, 3, 3, 4, 2, 2, 2, 5],
			sixth: [3, 3, 3, 3, 4, 3, 2, 2]
		}
	};

	showResults = inp => {
		this.setState({dept: inp.branch, sem: inp.semester, ch: inp.ch });
	}

	render() {
		return (
			<div className="container">
				<h1>GPA Calculator</h1>
				<div className="content">
					<Category onInputSubmit={this.showResults} />
					<RenderSub lists={this.state} />
					<OtherDept dept={this.state.dept} ch={this.state.ch} />
					<Cgpa ch={this.state.ch} />
				</div>
			</div>
		);
	}
}

export default App;