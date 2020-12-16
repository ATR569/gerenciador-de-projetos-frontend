
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Professor from '../components/professor/professor'
// import <componentes> from '...'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/professores' component={Professor} />
        {/* <Route path='/users' component={UserCrud} /> */}
        <Redirect from='*' to='/' />
    </Switch>