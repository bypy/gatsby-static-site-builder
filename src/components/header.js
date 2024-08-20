import * as React from "react"

import { default as cn } from "classnames"

import { container, titleStyle } from "./layout.module.css"

const Header = ({ pageTitle }) => (
  <header>
    <div className={cn(container, titleStyle)}>
      <span>{pageTitle}</span>
    </div>
  </header>
)

export default Header
