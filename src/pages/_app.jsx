import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../globals.css";
import Head from 'next/head';


function MyApp({ Component , pageProps }) {
  return (
    <Provider store={store}>
       <Head>
        <title>CartCraft</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
