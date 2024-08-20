import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import { blogPostContainer, blogPostContent } from "./blogTemplate.module.css"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  pageContext, // this prop will be injected by the createPage function.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { html } = markdownRemark
  const heading = markdownRemark.headings[0]?.value || "No heading"

  return (
    <Layout pageTitle={heading}>
      <div className={blogPostContainer}>
        <div
          className={blogPostContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      headings(depth: h1) {
        value
      }
    }
  }
`
