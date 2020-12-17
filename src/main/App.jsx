import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { storeToken } from '../service/auth'
// import jwt_decode from 'jwt-decode'

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

// import {TOKEN_ALUNO_MOCK, TOKEN_PROFESSOR_MOCK} from '../mock/tockenMock'

// storeToken(TOKEN_ALUNO_MOCK)

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />          
        </div>
    </BrowserRouter>