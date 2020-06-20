import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './containers/Login/Login.jsx'
import Game from './containers/Game/Game.jsx'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/Game/:players" exact component={Game} />
    </Switch>
  )
}