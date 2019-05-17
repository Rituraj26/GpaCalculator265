import React from 'react';
import '../stylesheets/OtherDept.css';
import '../stylesheets/Base.css';

class OtherDept extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			details: [{sub: '', credit: '', marks: ''}], //credit and marks are stored as string
			gpa: ''
		}
	}

	renderLists = () => {
		const arr = this.state.details.map((detail, ind) => {
			return (
				<div key={ind} className="otherdept__list">
					<input 
						type="text" 
						name="sub" 
						className="list-input"
						value={detail.sub} 
						onChange={e => this.handleChange(e, ind)} 
						required="required"
					/>
					<input 
						type="number" 
						name="credit" 
						className="list-input"
						value={detail.credit} 
						onChange={e => this.handleChange(e, ind)} 
						required="required"
					/>
					<input 
						type="number" 
						name="mark" 
						className="list-input"
						value={detail.marks} 
						onChange={e => this.handleChange(e, ind)} 
						required="required"
					/>
					<span className="delete" onClick={e => this.deleteInput(ind)}>X</span>
				</div>
			)
		});
		const heading = (
			<div key={Math.random()} className="otherdept__list" id="headings">
				<span>Subjects</span>
				<span>Credits</span>
				<span>Marks</span>
				<span className="blank">X</span>
			</div>
		);
		arr.unshift(heading);
		return arr;
	}

	handleChange = (event, ind) => {
		let detail = this.state.details;
		
		if(event.target.name === 'sub') {
			detail[ind] = {sub: event.target.value, credit: detail[ind].credit, marks: detail[ind].marks};
		} else if (event.target.name === 'credit') {
			detail[ind] = {sub: detail[ind].sub, credit: event.target.value, marks: detail[ind].marks};
		} else {
			detail[ind] = {sub: detail[ind].sub, credit: detail[ind].credit, marks: event.target.value};
		}

		this.setState({details: detail});
	}

	addNewSub = () => {
		let detail = {sub: '', credit: '', marks: ''};
		this.setState({details: this.state.details.concat([detail])});
	}

	deleteInput = id => {
		this.setState({
			details: this.state.details.filter((s, ind) => id !== ind)
		});
	}

	onFormSubmit = e => {
		e.preventDefault();
		e.target.reset();

		if(this.state.details.length === 0) {
			this.setState({gpa: ''});
		} else {
			let totalCreditScored = 0;
			let totalCredits = 0;
			for(let i = 0; i < this.state.details.length; i++) {
				let mark = parseInt(this.state.details[i].marks);
				let credit = parseInt(this.state.details[i].credit);
				let x = 0;
				console.log(typeof mark);
				if(credit === 1) {
					x = mark / 5;
				} else {
					x = mark / 10;
				}
				if(Number.isInteger(x)) {
					x = x + 1;
				} else {
					x = Math.ceil(x);
				}
				totalCreditScored = totalCreditScored + (x * credit);
				totalCredits = totalCredits + 10 * credit;
			}
			let gpa = ((totalCreditScored / totalCredits) * 10).toFixed(2);
			let detail = {sub: '', credit: '', marks: ''};
			this.setState({details: [detail], gpa: gpa});
		}
	}

	

	render() {
		
		if(this.props.dept !== 'Other' || this.props.ch === 'CGPA') {
			return <div></div>;
		}
		return (
			<div className="otherdept__container">
				<form className="otherdept__form" onSubmit={this.onFormSubmit}>
					<div>{this.renderLists()}</div>
					<button className="addnew" type="button" onClick={this.addNewSub}>Add New Subject <span>+</span></button>
					<button className="calculate" type="submit">Calculate Gpa</button>
				</form>
				<h3 className="result">Your Semester Gpa is: <span>{this.state.gpa}</span></h3>
			</div>
		);
	}

}

export default OtherDept;