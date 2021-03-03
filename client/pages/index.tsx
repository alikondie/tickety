import buildClient from '../api/build-client';
export default function Home({ currentUser }) {
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>You are not signed in</h1>
  );
}

// can execute on the server or the browser => on the browser when navigated from another page in the app
Home.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentUser');
  return data;
};
