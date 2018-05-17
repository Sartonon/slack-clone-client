import React from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import SideBar from '../containers/Sidebar';
import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null;
  }

  const teamIdx = teamId
    ? _.findIndex(allTeams, ['id', parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIdx];
  const channelIdx = channelId
    ? _.findIndex(team.channels, ['id', parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIdx];

  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list" />
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamsQuery, {
  options: { fetchPolicy: 'network-only' },
})(ViewTeam);
