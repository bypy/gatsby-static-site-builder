import * as React from "react"

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout pageTitle={"Not Found"}>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export const Head = () => (
  <>
    <title>Not Found</title>
    <meta name="description" content="Not Found" />
  </>
)

export default NotFoundPage
