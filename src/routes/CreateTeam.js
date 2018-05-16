import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Form,
  Message,
  Button,
  Input,
  Container,
  Header,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateTeam extends Component {
  constructor() {
    super();

    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { name } = this;
    let response;

    try {
      response = await this.props.mutate({
        variables: { name },
      });
    } catch (err) {
      this.props.history.push('/login');
      return;
    }

    const { ok, errors, team } = response.data.createTeam;
    if (ok) {
      this.props.history.push(`/view-team/${team.id}`);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      name,
      errors: { nameError },
    } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container>
        <Header style={{ marginTop: '10px' }} as="h2">
          Create team
        </Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length !== 0 && (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        )}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
