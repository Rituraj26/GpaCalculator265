import React from 'react';
import '../stylesheets/Cgpa.css';
import '../stylesheets/Base.css';

class Cgpa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cgpa: [{point: ''}],
			res: ''
		}
	}

	handleChange = (event, ind) => {
		let grade = this.state.cgpa;
		grade[ind] = event.target.value;
		this.setState({cgpa: grade});
	}

	renderLists = () => {
		const arr = this.state.cgpa.map((grd, index) => {
			return (
				<div key={index} className="cgpa__list">
					<span className="list-content">Semester - {index + 1} </span>
					<span className="list-input-container">
						<input 
							className="list-input"
							type="number" 
							value={grd.point} 
							onChange={e => this.handleChange(e, index)} 
							required="required"
						/>
					</span>
					<span className="delete" onClick={e => this.deleteInput(index)}>X</span>
				</div>
			);
		});
		const heading = (
			<div key={Math.random()} className="cgpa__list" id="headings">
				<span>Semesters</span>
				<span>GPA</span>
				<span className="blank">X</span>
			</div>
		);
		arr.unshift(heading);
		return arr;
	}

	handleSubmit = e => {
		e.preventDefault();
		e.target.reset();
		
		if(this.state.cgpa.length === 0) {
			this.setState({res: ''});
		} else {
			let temp = 0;
			this.state.cgpa.forEach(val => {
				temp = temp + parseFloat(val);
			});
			this.setState({cgpa: [{point: ''}], res: (temp / this.state.cgpa.length).toFixed(2)});
		}
	}

	addNewGPA = () => {
		this.setState({cgpa: this.state.cgpa.concat({point: ''})});
	}

	deleteInput = id => {
		this.setState({
			cgpa: this.state.cgpa.filter((s, ind) => id !== ind)
		});
	}

	render() {

		if(this.props.ch === 'GPA' || this.props.ch === '') {
			return <div></div>;
		}
		return (
			<div className="cgpa__container">
				<form className="form" onSubmit={this.handleSubmit}>
					<div>{this.renderLists()}</div>
					<button className="addnew" type="button" onClick={this.addNewGPA}>Add Gpa<span>+</span></button>
					<button className="calculate" type="submit">Calculate cgpa</button>
				</form>
				<h3 className="result">Your Cgpa is: <span>{this.state.res}</span></h3>
			</div>
		);
	}
}

export default Cgpa;