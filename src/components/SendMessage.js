import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SendMessage = ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message #${channelName}`} />
  </SendMessageWrapper>
);

export default SendMessage;

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;