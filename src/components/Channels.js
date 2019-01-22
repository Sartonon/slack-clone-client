import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Channels = ({
  teamName,
  username,
  channels,
  users,
  onAddChannelClick,
  teamId,
  onInvitePeople,
  isOwner,
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels{' '}
          {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
    {isOwner && (
      <PushLeft>
        <div>
          <a href="#invite-people" onClick={onInvitePeople}>
            + Invite People
          </a>
        </div>
      </PushLeft>
    )}
  </ChannelWrapper>
);

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  cursor: pointer;
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

const PushLeft = styled.div`
  ${paddingLeft};
  margin-top: 10px;
`;

const Green = styled.span`
  color: #38978d;
`;

export default Channels;
