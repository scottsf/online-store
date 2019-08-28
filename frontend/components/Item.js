import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(id: $id) {
      id
      title
      price
      description
    }
  }
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { item } = this.props;
    console.log(this.props.item.id);
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: '/item',
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id },
            }}
          >
            <a>Edit</a>
          </Link>
          <button> Add To Cart </button>
          <Mutation
            mutation={DELETE_ITEM}
            variables={{ id: this.props.item.id }}
            update={this.update}
          >
            {(deleteItem, { loading, error }) => (
              <button onClick={async () => await deleteItem()}> Delete </button>
            )}
          </Mutation>
        </div>
      </ItemStyles>
    );
  }
}

Item.propTypes = {};

export default Item;
