import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String!
    $description: String!
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      price
      description
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query GET_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
    }
  }
`;

class UpdateItem extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading ...';
          if (!data.item) return <p>No Item found for ID {this.props.id}!</p>;
          console.log(
            `${data.item.title}\n${data.item.price}\n${data.item.description}`
          );
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={{ ...this.state, id: this.props.id }}
            >
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={async e => {
                    e.preventDefault();
                    await updateItem();
                  }}
                >
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={data.item.title}
                        placeholder="Title"
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={data.item.price}
                        placeholder="Price"
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        type="number"
                        id="description"
                        name="description"
                        defaultValue={data.item.description}
                        placeholder="Enter a description"
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sa{loading ? 'ving' : 'ved'} changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
export { SINGLE_ITEM_QUERY };
