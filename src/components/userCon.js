import React from 'react';

export default function UserCon(props) {
	return (
		<div>
			<h3>Connected Users</h3>
			<ul className="list-group" id="users">
				{props.users}
			</ul>
		</div>

		);
}