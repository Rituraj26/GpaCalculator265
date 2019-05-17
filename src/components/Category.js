import React from 'react';
import '../stylesheets/Category.css';

class Category extends React.Component {

	state = {
		branch: 'CSE', 
		semester: 'first', 
		ch: 'GPA',
		gpaSelect: '',
		cgpaSelect: ''
	};

	onRadioSubmit = e => {
		this.setState({branch: e.target.value}, () => {
			this.props.onInputSubmit(this.state);
		});
	}

	onFormSubmit = e => {
		e.preventDefault();
		this.setState({semester: e.target.value}, () => {
			this.props.onInputSubmit(this.state);
		});
	}

	categorySelect = e => {
		if(e.target.id === 'GPA') {
			this.setState({ch: 'GPA', gpaSelect: 'toggle-class', cgpaSelect: ''}, () => {
				this.props.onInputSubmit(this.state);
			});
		} else if(e.target.id === 'CGPA') {
			this.setState({ch: 'CGPA', gpaSelect: '', cgpaSelect: 'toggle-class'}, () => {
				this.props.onInputSubmit(this.state);
			});
		}
	}

	render() {
		return (
			<div className="category">
				<form className="category__form">
					<div>
						<label htmlFor="branch">Branch</label>
						<input 
							type="radio"  
							name="branch" 
							value="CSE" 
							checked={this.state.branch === 'CSE'} 
							onChange={this.onRadioSubmit} 
						/>CSE
						<input 
							type="radio" 
							name="branch" 
							value="Other" 
							onChange={this.onRadioSubmit} 
						/>Other
					</div>
					<div>
						<label htmlFor="sems">Semester</label>
						<select className="category__form--dropdown" id="sems" onChange={this.onFormSubmit}>
							<option value="first">1</option>
							<option value="second">2</option>
							<option value="third">3</option>
							<option value="fourth">4</option>
							<option value="fifth">5</option>
							<option value="sixth">6</option>
						</select>
					</div>
					
				</form>

				<div className="category__ch" onClick={this.categorySelect}>
					<span className={`category__ch--button ${this.state.gpaSelect}`} id="GPA" type="button">Semester GPA</span>
					<span className={`category__ch--button ${this.state.cgpaSelect}`} id="CGPA" type="button">Cummulative GPA</span>
				</div>
			</div>
		);
	}

}

export default Category;