import React from 'react';
import UserCon from './userCon';
import Login from './login';
import Messenger from './messenger';
import io from 'socket.io-client';
import './layout.css';

//url of the server
const socketUrl = "http://localhost:8000/";

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			socket: null,
			post: [],
			userSubmited: false,
			users:[]
		}

		this.messageSubmit = this.messageSubmit.bind(this);
		this.userFromSubmit = this.userFromSubmit.bind(this);
	}

	componentWillMount() {
		this.initSocket();
	}

	initSocket() {
		const socket = io(socketUrl);
		socket.on('connect', () => {
			console.log('Connected');
		})
		this.setState({
			socket: socket
		});
		console.log(this.state.socket);
	};

	messageSubmit(e) {
		e.preventDefault();
		const submited = e.target.post;
		const submitedValue = submited.value;
		this.state.socket.emit('send message', submitedValue);
		e.target.post.value = "";
	};
	
	componentDidMount() {
		this.state.socket.on('new message', (data) => {
				this.setState({
					post: [...this.state.post, data]
				});
		});	

		this.state.socket.on('get users', (data) => {
			console.log(data);
			this.setState({
				users: data.map((user,index) => <li key={index} className="list-group-item">{user}</li>)
			});
		});
	};

	userFromSubmit(e) {
		e.preventDefault();
		const submited = e.target.Username;
		const submitedValue = submited.value;
		this.state.socket.emit('new user', submitedValue, (data) => {
			if(data) {
				this.setState({ userSubmited: true})
			}
		});
		e.target.Username.value = "";
	};

	render() {
		const msgPost = () => this.state.post.map((data, index) => <li key={index} ref={index}><strong>{data.user}</strong> : {data.msg}</li>);
		
		return (
			<div className="container">
				<Login 
					hide={(this.state.userSubmited)? 'hide':''}
					onSubmit={this.userFromSubmit}
				/>
				<div className={(this.state.userSubmited)? '': 'hide'}>
					<div className="row">
						<div className="col-md-4">
							<UserCon 
								users={this.state.users}
							/>
						</div>
						<div className="col-md-8">
							<Messenger 
								newMsg={msgPost()}
								onSubmit={this.messageSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
		);

	}
}