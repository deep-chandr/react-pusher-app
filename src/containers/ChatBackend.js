import React , {Component} from 'react';
import StartModal from '../components/StartModal/StartModal';
import ChatBox from '../components/ChatBox/ChatBox';
import {connect} from 'react-redux';

import axios from 'axios';
import Pusher from 'pusher-js';
import * as actionTypes from '../store/actions';

class ChatBackend extends Component{
	state = {
		
	}
  componentDidMount() {
    var pusher = new Pusher('7d0ed1c125d0b78dfd81', {
      cluster: 'ap2',
      encrypted: true
    });

    const channel = pusher.subscribe('chat');
    const channel2 = pusher.subscribe('chatUser');

    channel.bind('message', data => {
      var x = Date.now();
      const newdata = {...data, key:x}
      this.props.setChats(newdata);
    });

    channel2.bind('usercount', data => {
      var x = Date.now();
      const newuser = {...data, key:x}
      console.log('newuser', newuser);
      this.props.setUsers(newuser);

/*      this.props.setChats(newdata);*/
    });

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {

    if (e.key === 'Enter') {
/*    	if enter is pressed.*/
      const payload = {
        avatarName: this.props.avatarName,
        message: this.props.text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
/*    	if message is typed.*/
      this.props.onTextChange(e.target.value);
    }
  }
  sendMesssage = () => {
	const payload = {
		avatarName: this.props.avatarName,
		message: this.props.text
	};
	axios.post('http://localhost:5000/message', payload);
  }
  handleModalClose = e =>{
  	if (e.key === 'Enter') {
  		this.props.close();
    }
  }


	render(){
		return (
			<div>
				<StartModal profileStatus={this.props.isProfileInfoEntered}
							dimmer={this.props.dimmer}
							onclose={this.props.close}
							defaultAvatarName={this.props.avatarName}
							avatarName={this.props.setAvatarName}
							enterkeypress={this.handleModalClose} />
				<ChatBox newInput={this.handleTextChange}
							keyPress={this.handleTextChange}
							click={this.sendMesssage} />

			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		dimmer: state.dimmer,
		isProfileInfoEntered: state.isProfileInfoEntered,
		avatarName: state.avatarName,
		text: state.text,
		chats: state.chats

	}
}
const mapDispatchToProps = dispatch => {
	return {
		close: () => dispatch({type: actionTypes.ON_MODAL_CLOSED}),
		setAvatarName: (event) => dispatch({type: actionTypes.SET_AVATAR_NAME, newName: event.target.value }),
		onTextChange: (data)=> dispatch({type: actionTypes.SET_TEXT, msg: data}),
		setChats: (data)=> dispatch({type: actionTypes.SET_CHATS, data: data}),
		setUsers: (data) => dispatch({type: actionTypes.SET_USERS, data: data})
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatBackend);