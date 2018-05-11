import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input, Container, Header } from 'semantic-ui-react';

class Login extends Component {
  constructor() {
    super();

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onSubmit = () => {
    const { email, password } = this;
    console.log(email);
    console.log(password);
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const { email, password } = this;

    const inputStyle = {
      marginBottom: '10px',
    };

    return (
      <Container>
        <Header style={{ marginTop: '10px' }} as="h2">
          Login
        </Header>
        <Input
          style={inputStyle}
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          style={inputStyle}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default observer(Login);
