import * as actionTypes from './actions';
import axios from 'axios';

const initialState = {
	dimmer: true,
	isProfileInfoEntered: !false,
	avatarName: 'Anonymous',
	text: '',
	chats: [],
	users: []
}

const reducers = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.ON_MODAL_CLOSED: 
				axios.post('/usercount', {username: state.avatarName });
				return {
					...state,
					isProfileInfoEntered: false
				}
		case actionTypes.SET_USERS: 
				return {
					...state,
					users: [...state.users, action.data],
					test: ''
				}
		case actionTypes.SET_AVATAR_NAME: 
				return {
					...state,
					avatarName: action.newName
				}
		case actionTypes.SET_TEXT:
				return {
					...state,
					text: action.msg
				}
		case actionTypes.SET_CHATS:
				return {
					...state,
					chats: [...state.chats, action.data],
					test: ''
				}
		default: return state
	}
}
export default reducers;