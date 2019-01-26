import React from 'react';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import _ from 'lodash';
import { compose, graphql } from 'react-apollo';
import { meQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add channel</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            placeholder="Channel name"
          />
        </Form.Field>
        <Form.Group width="equal">
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Create channel
          </Button>
          <Button disabled={isSubmitting} onClick={onClose} fluid>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: () => ({ name: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      { props: { teamId, mutate, onClose }, setSubmitting },
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          __typename: 'Mutation',
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (proxy, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }

          const data = proxy.readQuery({ query: meQuery });
          const teamIdx = _.findIndex(data.me.teams, ['id', teamId]);
          data.me.teams[teamIdx].channels.push(channel);
          proxy.writeQuery({ query: meQuery, data });
        },
      });
      setSubmitting(false);
      onClose();
    },
  }),
)(AddChannelModal);
