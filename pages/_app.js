import Head from 'next/head'
import { Alert, Nav } from '../components'
import '../styles/globals.css'

export default App

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ethlas users</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <div className="app-container bg-light">
        <Nav />
        <Alert />
        <div className="container pt-4 pb-4">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}
