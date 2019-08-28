import Items from '../components/Items';

const Home = props => {
  console.log(props);
  return (
    <div>
      <Items page={parseFloat(props.query.page) || 1} />
    </div>
  );
};
export default Home;
