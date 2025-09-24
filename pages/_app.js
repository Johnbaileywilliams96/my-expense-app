import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Layout>
      <Component {...pageProps} user={user} login={login} logout={logout} />
    </Layout>
  );
}