/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { default as cn } from "classnames"

import Header from "./header"
import Nav from "./nav"
import {
  row,
  menu,
  main,
  page,
  mainWrapper,
  menuWrapper,
  footer,
} from "./layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={page}>
      <div className={row}>
        <div className={menuWrapper}>
          <div className={cn(menu)}>
            <Header pageTitle={`Тестирование производительности`} />
            <Nav />
          </div>
        </div>
        <div className={mainWrapper}>
          <main className={cn(main)}>{children}</main>
          <footer className={cn(footer, "text-center")}>
            © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Layout
