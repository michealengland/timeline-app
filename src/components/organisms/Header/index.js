import React from 'react'
import {Link} from 'react-router-dom'
import appConfig from '@AppConfig'

export default function Header() {
  return (
    <header>
      <h1>
        <Link to={`/`}>{appConfig.name}</Link>
      </h1>
    </header>
  )
}
