import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <SendMessageWrapper>
    <form onSubmit={e => !isSubmitting && handleSubmit(e)}>
      <Input
        name="message"
        value={values.message}
        onBlur={handleBlur}
        onChange={handleChange}
        fluid
        placeholder={`Message #${channelName}`}
      />
    </form>
  </SendMessageWrapper>
);

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: () => ({ message: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm },
    ) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { channelId, text: values.message },
      });

      resetForm(false);
    },
  }),
)(SendMessage);

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;
