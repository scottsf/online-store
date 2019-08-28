// import { withRouter } from 'next/router';
import UpdateItem from '../components/UpdateItem';

const Update = props => {
  console.log('Hellllllo ', props);
  return (
    <div>
      <UpdateItem id={props.query.id} />;
    </div>
  );
};
export default Update;
