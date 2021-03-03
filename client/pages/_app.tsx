import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import Header from '../components/header';
function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentUser');
  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, currentUser: data.currentUser };
};

export default MyApp;
