import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);


  return (
    <Layout>
      <Component {...pageProps} user={user} setUser={setUser} />
    </Layout>
  );
}