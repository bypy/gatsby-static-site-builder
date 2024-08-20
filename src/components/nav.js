import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import slugify from "slugify"
import { default as cn } from "classnames"

import { pathPrefix } from "../../gatsby-config"
import { tocH1, tocH2 } from "./nav.module.css"

const Nav = () => {
  const query = graphql`
    query MyQuery {
      markdown: allMarkdownRemark(sort: { fields: { slug: ASC } }) {
        edges {
          node {
            headings {
              depth
              id
              value
            }
            fields {
              slug
            }
          }
        }
      }
      pages: allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `

  const data = useStaticQuery(query)

  const links = data.markdown.edges.map(({ node }) => {
    const headings = sortHeadings(node.headings)
    const href = `${node.fields.slug}${slugify(headings.h1.id, {
      lower: true
    })}`
    const navItem = (
      <li key={headings.h1.id}>
        <Link to={href} activeClassName="active">
          {headings.h1.value}
        </Link>
        {headings.h2.length && (
          <ul className={cn(tocH2)}>
            {headings.h2.map(h2 => (
              <li key={h2.id}>
                <a href={`${pathPrefix || ""}${pathPrefix ? href.slice(1) : href}#${encodeURIComponent(h2.id)}`}>{h2.value}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    )

    return navItem
  })

  return <ul className={cn(tocH1)}>{links}</ul>
}

function sortHeadings(headings) {
  const results = {
    h1: null,
    h2: []
  }
  headings.forEach(({ depth, id, value }) => {
    if (depth === 1 && !results.h1) {
      results.h1 = { id, value }
    } else if (depth === 2) {
      results.h2.push({ id, value })
    }
  })
  return results
}

export default Nav
