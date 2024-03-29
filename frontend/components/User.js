import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER };
