import React, {Component} from 'react';
import { Grid, Image, Input, Button, Header } from 'semantic-ui-react'
import dexter from '../../assets/images/d2.jpg'
import classes from './ChatBox.css'
import Aux from '../../hoc/aux'
import ChatContent from './ChatContent/ChatContent';
import UserContent from './UserContent/UserContent';

import {connect} from 'react-redux';

import { List, AutoSizer } from "react-virtualized";

/*		    	<Grid.Row className={classes.ChatList}>
		    		{props.chats.map(chat => {
		    			return(<ChatContent 
		    				key={chat.key} 
		    				avatarName={chat.avatarName} 
		    				message={chat.message} />)   })}
		    	</Grid.Row>*/

class ChatBox extends Component{
	renderRowMsg = ({index, isScrolling, key, style}) => {
		return (
			<div key={key} style={style}>
				<Grid.Row className={classes.ChatList}>
		    		<ChatContent 
		    				key={this.props.chats[index].key} 
		    				avatarName={this.props.chats[index].avatarName} 
		    				message={this.props.chats[index].message} />
		    	</Grid.Row>
			</div>
		)
	}
	renderRowAvatar = ({index, isScrolling, key, style}) => {
		return (
			<div key={key} style={style}>
				<Grid.Row className={classes.ChatList}>
		    		<UserContent 
		    				key={this.props.users[index].key} 
		    				avatarName={this.props.users[index].username} />
		    	</Grid.Row>
			</div>
		)
	}

	render(){
		return(<Aux>
		  <Grid className={classes.ChatBox}>
		    <Grid.Column width={12} >

		    	<Grid.Row >
		    		<Header as='h1'>miniOmegle</Header>
		    	</Grid.Row>

		    	<Grid.Row className={classes.ChatHeader}>
		    		<Header as='h3' >Talk To Strangers</Header>
		    	</Grid.Row>

		    	<Grid.Row className={classes.ChatList}>
			      <AutoSizer>
			        {({ width, height }) => {
			          return <List 
						          rowCount={this.props.chats.length}
						          width={width}
						          height={height}
						          rowHeight={50}
						          rowRenderer={this.renderRowMsg}
						          />
			        }}
			      </AutoSizer>
		    	</Grid.Row>

		    	<Grid.Row >
		    		<Grid className={classes.Input}>
		    			<Grid.Column width={12}>
			    			<Input onChange={this.props.newInput} onKeyPress={this.props.keyPress} fluid placeholder='Text...' />
			    		</Grid.Column>

			    		<Grid.Column width={4}>
							<Button fluid content='Send' onClick={this.props.click} />
			    		</Grid.Column>
		    		</Grid>
		    	</Grid.Row>
		      
		    </Grid.Column>
		    <Grid.Column width={4} className={classes.info}>

		    	<Grid.Row className={classes.ChatHeader}>
		    		<Header as='h3' >Active Users</Header>
		    	</Grid.Row>

		    	<Grid.Row className={classes.ChatList}>
		    		<AutoSizer>
				        {({ width, height }) => {
				          return <List 
							          rowCount={this.props.users.length}
							          width={width}
							          height={height}
							          rowHeight={50}
							          rowRenderer={this.renderRowAvatar}
							          />
				        }}
				    </AutoSizer>
		    	</Grid.Row>
			      	
		    </Grid.Column>

		  </Grid>
		</Aux>);
	}
}

const mapStateToProps = state => {
	return {
		chats: state.chats,
		users: state.users
	}
}

export default connect(mapStateToProps)(ChatBox);