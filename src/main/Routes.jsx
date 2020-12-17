
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Aluno from '../components/alunos/Aluno'
import Professor from '../components/professor/professor'
import Logout from '../components/logout/Logout'
import Projetos from '../components/projetos/Projetos'
import Cadastro from '../components/cadastro/Cadastro'
import Login from '../components/login/Login'
import PrivateRoute from '../components/template/PrivateRoute'

export default props => 
    <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/alunos' component={Aluno} />
        <PrivateRoute exact path='/professores' component={Professor} />
        <PrivateRoute exact path='/projetos' component={Projetos} />
        <PrivateRoute path='/logout' component={Logout} />
        <PrivateRoute path='/cadastro' component={Cadastro} />
        <Redirect from='*' to='/' />
    </Switch>