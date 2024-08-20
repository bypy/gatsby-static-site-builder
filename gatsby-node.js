const fs = require("fs")

const slugify = require("slugify")
const { createFilePath } = require("gatsby-source-filesystem")
const { graphql } = require("gatsby")
/**
 * 1) open and validate gatsby-configs
 * The gatsby-config.js file for the site and any installed themes are opened,
 * ensuring that a function or object is exported for each.
 */

/**
 * 2) load plugins
 * Plugins installed and included in the config of your site and your site’s themes are loaded.
 * Gatsby uses Redux for state management internally and stores info
 * like the version, name, and what APIs are used by each plugin.
 */

/**
 * 3) The first API called during Gatsby execution.
 * Runs as soon as plugins are loaded, before cache initialization and bootstrap preparation.
 *
 * @type {import('gatsby').GatsbyNode['onPreInit']}
 */
exports.onPreInit = (/** @type {import('gatsby').PreInitArgs} */ args) => {}

/**
 * 4) delete html and css files from previous builds
 * The only different step between develop and build, the HTML and CSS from previous builds is deleted
 * to prevent problems with styles and pages that no longer exist.
 */

/**
 * 5) initialize cache
 * https://www.gatsbyjs.com/docs/build-caching/
 */

/**
 * 6) copy gatsby files
 * Copies site files into the cache in the .cache folder.
 */

/**
 * 7) Starts main bootstrap process.
 * Calls the onPreBootstrap node API in your site or plugins where it is implemented.
 * Called once Gatsby has initialized itself and is ready to bootstrap your site.
 *
 * @type {import('gatsby').GatsbyNode['onPreBootstrap']}
 */
exports.onPreBootstrap = (
  /** @type {import('gatsby').ParentSpanPluginArgs} */ args
) => {
  const { reporter } = args
  const contentPath = `${__dirname}/src/content/`

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

/**
 * 8) source and transform nodes
 * Creates Node objects from your site and all plugins implementing the sourceNodes API,
 * and warns about plugins that aren’t creating any nodes.
 * Nodes created by source or transformer plugins are cached.
 * Node objects created at this stage are considered top level nodes,
 * meaning they don’t have a parent node that they are derived from.
 *
 * Within this, createNode can be called multiple times, which then triggers onCreateNode.
 * This API is called during the Gatsby bootstrap sequence.
 * Source plugins use this hook to create nodes.
 *
 * This API is called exactly once per plugin (and once for your site’s gatsby-config.js file).
 *
 * If you define this hook in gatsby-node.js it will be called exactly once after all of your source plugins have finished creating nodes.
 *
 * @type {import('gatsby').GatsbyNode['sourceNodes']}
 */
exports.sourceNodes = (
  /** @type {import('gatsby').SourceNodesArgs} */ args
) => {
  const { actions, createNodeId, createContentDigest } = args
  const { createNode } = actions
}

/**
 * 8a) onCreateNode
 * Called when a new node is created.
 * Plugins wishing to extend or transform nodes created by other plugins should implement this API.
 *
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = async (
  /** @type {import('gatsby').CreateNodeArgs} */ args
) => {
  const { actions, node, getNode, reporter } = args
  const { createNodeField } = actions

  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `src/content` directory into `/blog/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "src/content",
    })

    // Creates new queryable field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/blog${relativeFilePath}`,
    })
  }
}

/**
 * 9) Add explicit types
 * Adds types to the GraphQL schema for nodes that you have defined explicitly with Gatsby’s schema optimization APIs.
 * Customize Gatsby’s GraphQL schema by creating type definitions, field extensions or adding third-party schemas.
 *
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = (
  /** @type {import('gatsby').CreateSchemaCustomizationArgs} */ args
) => {
  const { actions } = args
  const { createTypes, createFieldExtension } = actions
  // https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
}

/**
 * 10) Add inferred types
 * All other nodes not already defined are inspected and have types inferred by Gatsby.
 */

/**
 * 11) Processing types
 * Composes 3rd party schema types, child fields, custom resolve functions,
 * and sets fields in the GraphQL schema. It then prints information about type definitions.
 *
 * @type {import('gatsby').GatsbyNode['createResolvers']}
 */
exports.createResolvers = (
  /** @type {import('gatsby').CreateResolversArgs} */ args
) => {
  const { createResolvers } = args
  // https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#custom-query-fields
}

/**
 * 12) building schema
 * Imports the composed GraphQL schema and builds it.
 */

/**
 * 13) CreatePages from the gatsby-node.js
 * Within this, createPage can be called any number of times, which then triggers onCreatePage
 * Plugins can handle the onCreatePage event at this point for use cases like manipulating the path of pages.
 *
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async (
  /** @type {import('gatsby').CreatePagesArgs} */ args
) => {
  const { actions, graphql } = args
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const query = `
    {
      allMarkdownRemark(
        sort: { fields: { slug: ASC } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            headings(depth: h1) {
              id
            }
          }
        }
      }
    }
  `

  const { errors, data } = await graphql(query)

  if (errors) {
    return Promise.reject(errors)
  }

  return data.allMarkdownRemark.edges.forEach(({ node }) => {
    let { slug } = node.fields
    const h1 = node.headings.length ? node.headings[0].id : `post-${node.id}`
    const path = `${slug}${slugify(h1, { lower: true })}`
    createPage({
      path,
      component: blogPostTemplate,
      context: {
        slug,
      },
    })
  })
}

/**
 * 14) CreatePagesStatefully
 * Similar to the createPages step, but for the createPagesStatefully API which is intended for plugins
 * who want to manage creating and removing pages in response to changes in data not managed by Gatsby.
 *
 * @type {import('gatsby').GatsbyNode['createPagesStatefully']}
 */
exports.createPagesStatefully = async (
  /** @type {import('gatsby').CreatePagesArgs} */ args
) => {
  const { actions } = args
  const { createPage } = actions
}

/**
 * 15) Runs onPreExtractQueries for your site and all plugins implementing it.
 * Extracts queries from pages and components (useStaticQuery)
 * Run before GraphQL queries/fragments are extracted from JavaScript files.
 * Useful for plugins to add more JavaScript files with queries/fragments e.g. from node_modules.
 *
 * @type {import('gatsby').GatsbyNode['onPreExtractQueries']}
 */
exports.onPreExtractQueries = async (
  /** @type {import('gatsby').ParentSpanPluginArgs} */ args
) => {
  const { actions } = args
  const { createFieldExtension } = actions
}

/**
 * 16) Update schema
 * Rebuilds the GraphQL schema, this time with SitePage context — an internal piece of Gatsby
 * that allows you to introspect all pages created for your site.
 */

/**
 * 17) Extract queries from components
 * All JavaScript files in the site are loaded and Gatsby determines
 * if there are any GraphQL queries exported from them.
 * Runs query validation based on schema.
 * If there are problematic queries they can be reported back with warnings or errors.
 * All these queries get queued up for execution in a later step.
 */

/**
 * 18) write out requires
 * Executes queries and stores their respective results.
 * An internal Gatsby utility adds the code that files need to load/require.
 * Compiles GraphQL queries and creates the Abstract Syntax Tree (AST).
 */

/**
 * 19) Write out redirect data
 * Writes page redirects (if any) to .cache/redirects.json
 * An internal Gatsby utility adds code for redirects, like implemented with createRedirect.
 * https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect
 */

/**
 * 20) Build manifest and related icons - (from gatsby-plugin-manifest)
 * This step is activated by gatsby-plugin-manifest in the gatsby-default-starter
 * and is not a part of the built-in Gatsby functionality,
 * demonstrating how plugins are able to tap into the lifecycle.
 * The plugin adds a manifest.json file with the specified configurations and icons.
 */

/**
 * Called at the end of the bootstrap process after all other extension APIs have been called.
 *
 * @type {import('gatsby').GatsbyNode['onPostBootstrap']}
 */
exports.onPostBootstrap = async (
  /** @type {import('gatsby').ParentSpanPluginArgs} */ args
) => {
  const { cache, store, graphql } = args
}
