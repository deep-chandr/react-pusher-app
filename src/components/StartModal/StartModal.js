import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button, Image, Modal } from 'semantic-ui-react'
import dexter from '../../assets/images/d2.jpg';

const StartModal = (props) => {


	return (
		<div>	
			<Modal dimmer={props.dimmer} open={props.profileStatus} onClose={props.onclose}>
	          <Modal.Header>Select a Photo</Modal.Header>
	          <Modal.Content image>
	            <Image wrapped size='medium' src={dexter} />
	            <Modal.Description>
	              <Input focus 
	              			placeholder='Your Avatar Name...'
             				onChange={props.avatarName}
             				onKeyPress={props.enterkeypress} />
	            </Modal.Description>
	          </Modal.Content>
	          <Modal.Actions>
	            <Button positive icon='checkmark' labelPosition='right' content="Start Chat" onClick={props.onclose} />
	          </Modal.Actions>
	        </Modal>
		</div>
	);
}

export default StartModal;