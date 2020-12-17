
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

// import Home from '../components/home/Home'
import Login from '../components/login/Login'
import Aluno from '../components/alunos/Aluno'
import Professor from '../components/professor/professor'
import Logout from '../components/logout/Logout'
import Projetos from '../components/projetos/Projetos'
// import <componentes> from '...'

export default props => 
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/alunos' component={Aluno} />
        <Route exact path='/professores' component={Professor} />
        <Route exact path='/projetos' component={Projetos} />
        {/* <Route exact path='/login' component={Login} /> */}
        <Route path='/logout' component={Logout} />
        <Redirect from='*' to='/' />
    </Switch>