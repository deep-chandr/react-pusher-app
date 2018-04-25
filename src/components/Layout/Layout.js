import React from 'react'
import { Container } from 'semantic-ui-react'
import classes from './Layout.css';
import ChatBackend from '../../containers/ChatBackend';

const ThemingLayout = () => (
  <div className={classes.Layout}>
    <Container style={{ marginTop: '15px' }} >
      <ChatBackend />
    </Container>
  </div>
)

export default ThemingLayout