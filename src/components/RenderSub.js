import React from 'react';
import '../stylesheets/RenderSub.css';
import '../stylesheets/Base.css';

class RenderSub extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			marks: [{mark: ''}],
			gpa: ''
		}
	}

	handleChange = (e, k) => {
		let mark = this.state.marks;
		mark[k] = {mark: parseInt(e.target.value)};
		this.setState({marks: mark});
	}
	
	getValue = id => {
		if(this.state.marks[id] !== undefined) {
			return this.state.marks[id].id;
		}
	}


	renderedLists = () => {
		let sems = this.props.lists.subjects[this.props.lists.sem];
		let keys = Object.keys(sems);
		let subjects = Object.values(sems);
		
		const arr = subjects.map((sub, index) => {
			return (
				<div className="rendersub__list" key={keys[index]}>
					<span className="list-content">
						{sub}
					</span>
					<span className="list-input-container">
						<input 
							className="list-input"
							type="number" 
							value={this.getValue(keys[index])} 
							onChange={e => this.handleChange(e, keys[index])} 
							required="required"
						/>
					</span>
				</div>
			);
		});
		const heading = (
			<div key={Math.random()} className="rendersub__list" id="headings">
				<span>Subjects</span>
				<span>Marks</span>
			</div>
		);
		arr.unshift(heading);
		return arr;
		
	} 

	initialState = e => {
		e.preventDefault();
		e.target.reset();
		let totalCreditScored = 0;
		let totalCredits = 0;
		let credit = this.props.lists.credits[this.props.lists.sem];
		for(let i = 0; i < this.state.marks.length; i++) {
			let x = 0;
			if(credit[i] === 1) {
				x = this.state.marks[i].mark / 5;
			} else {
				x = this.state.marks[i].mark / 10;
			}
			
			if(Number.isInteger(x)) {
				x = x + 1;
			} else {
				x = Math.ceil(x);
			}
			totalCreditScored = totalCreditScored + (x * credit[i]);
			totalCredits = totalCredits + 10 * credit[i];
		}
		let gpa = ((totalCreditScored / totalCredits) * 10).toFixed(2);
		this.setState({marks: [{mark: ''}], gpa: gpa});
		
	}

	render() {
		
		if(this.props.lists.sem === '' || this.props.lists.dept === 'Other' || this.props.lists.ch === 'CGPA') {
			return <div></div>;
		}

		return (
			<div className="rendersub__container">
				<form className="form" onSubmit={this.initialState}>
					<div>{this.renderedLists()}</div>
					<button className="calculate" type="submit">Calculate Gpa</button>
				</form>
				<h3 className="result">Your Sem Gpa is: <span>{this.state.gpa}</span></h3>
				
			</div>
		);
	}

}	

export default RenderSub;