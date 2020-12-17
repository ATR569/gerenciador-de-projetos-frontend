
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Aluno from '../components/alunos/Aluno'
import Professor from '../components/professor/professor'
import Logout from '../components/logout/Logout'
// import <componentes> from '...'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/alunos' component={Aluno} />
        <Route exact path='/professores' component={Professor} />
        <Route path='/logout' component={Logout} />
        <Redirect from='*' to='/' />
    </Switch>