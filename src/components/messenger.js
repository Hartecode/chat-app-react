import React from 'react';
import './messenger.css';

export default class Massenger extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<ul className="chat" id="chat" refs="chat">
					{this.props.newMsg}
				</ul>
				<form onSubmit={this.props.onSubmit}>
					<fieldset className="form-group">
						<label>Enter Mesaage</label>
						<textarea 
							className="form-control" 
							name="post">
						</textarea>
						<br />
						<input type="submit" 
							className="btn btn-primary" 
							value="Send Message" 
						/>
					</fieldset>
				</form>
			</div>
		);
	}
}