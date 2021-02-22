import "../../styles/globals.css";

import IGAuthProvider from "../providers/IGAuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <IGAuthProvider>
      <Component {...pageProps} />
    </IGAuthProvider>
  );
}

export default MyApp;
