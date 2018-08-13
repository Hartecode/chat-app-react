import React from 'react';


export default function Login(props) {

	return (
		<form className={props.hide} onSubmit={props.onSubmit}>
			<fieldset className="form-group">
				<label>Enter Username</label>
				<input 
					className="form-control" 
					name="Username"
				/>
				<br />
				
				<input 
					type="submit" 
					className="btn btn-primary" 
					value="Login"
				/>
			
			</fieldset>
		</form>
	)
}