import React from 'react';
import classes from './ChatContent.css';
import {Feed} from 'semantic-ui-react';

import {connect} from 'react-redux';
import dexter from '../../../assets/images/d2.jpg';



const ChatContent = (props) => {
	const chatHist = 
	  		<div className={classes.chatMsg} >
				<Feed>
		  			<Feed.Event >
				      <Feed.Label>
				        <img src={dexter} />
				      </Feed.Label>
				      <Feed.Content>
				        <Feed.Summary>
				          <Feed.User>{props.avatarName}</Feed.User>&emsp;&emsp; {props.message}
				        </Feed.Summary>
				        <Feed.Meta>
				        </Feed.Meta>
				      </Feed.Content>
				    </Feed.Event>
		  		</Feed>
	  		</div>


	return(
		<div className={classes.ChatContent}>
	    	{chatHist}
			
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		avatar: state.avatarName
	}
}
const mapDispatchToProps = dispatch => {
	return{

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);