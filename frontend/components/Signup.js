import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      password
      name
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
  };

  saveToState = e => {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { loading, error }) => {
          if (error) return error;
          return (
            <Form
              method="post"
              onSubmit={e => {
                e.preventDefault();
                signup();
                this.setState({
                  email: '',
                  password: '',
                  name: '',
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an acc</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={this.saveToState}
                  />
                </label>
              </fieldset>
              <button type="submit">Signup!</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
