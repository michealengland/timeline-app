import React from 'react'
import {Link} from 'react-router-dom'
import projectConfig from '../../../projectConfig'

export default function Header() {
  return (
    <header>
      <h1>
        <Link to={`/`}>{projectConfig.name}</Link>
      </h1>
    </header>
  )
}
