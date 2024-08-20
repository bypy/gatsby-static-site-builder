# Static Blog Generator

A Gatsby.js project for building static pages from Markdown files.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [NPM Scripts](#npm-scripts)
- [Directory Structure](#directory-structure)
- [License](#license)

## Overview

This project is a static site generator built using Gatsby.js. It converts Markdown files located in the `src/content` directory into static pages. Gatsby.js handles the build process, providing a fast, optimized, and SEO-friendly static site.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

Make sure you have Node.js and Gatsby CLI installed on your machine.

## Usage

You can use the following npm scripts to work with the project:

### NPM Scripts

- **`build`**: Builds the static site for production.

  ```bash
  npm run build
  ```

- **`develop_plus_content`**: Starts the development server with content refresh enabled. Useful for hot-reloading content changes.

  ```bash
  npm run develop_plus_content
  ```

- **`develop`**: Starts the standard development server with hot-reloading for code changes.

  ```bash
  npm run develop
  ```

- **`start`**: An alias for `gatsby develop`.

  ```bash
  npm start
  ```

- **`serve`**: Serves the production build locally.

  ```bash
  npm run serve
  ```

- **`clean`**: Cleans up the `.cache` and `public` directories.

  ```bash
  npm run clean
  ```

## Directory Structure

The key directories and files in the project are:

- **`src/components`**: Contains React components used throughout the site.
- **`src/content`**: This is where all your Markdown files are stored. Each Markdown file represents a static page on your site.
- **`src/templates`**: Gatsby templates for rendering pages from Markdown files.
- **`src/pages`**: Contains the static pages of the site, such as the homepage or any other pages defined using React components. Gatsby automatically creates routes for these pages.
- **`src/styles`**: Contains the base styles and CSS used across the site. This is where you define global styles, typography, and other common styling elements.
- **`gatsby-config.js`**: Configuration file for Gatsby plugins and settings.
- **`gatsby-browser.js`**: Allows you to customize and extend Gatsby's behavior in the browser, such as adding global styles or wrapping the root element with a provider.
- **`gatsby-node.js`**: Contains custom Node.js scripts that extend or modify Gatsby's build process. Common uses include dynamically creating pages or manipulating the GraphQL schema.
- **`gatsby-ssr.js`**: Enables customizations to Gatsby's server-side rendering (SSR) process. You can use it to implement SSR-specific logic or modify the HTML output.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.