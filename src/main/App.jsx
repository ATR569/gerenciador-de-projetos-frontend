import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { storeToken } from '../service/auth'

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

storeToken('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIwMjA2NzU1OSIsInVzdWFyaW8iOnsiaWQiOjEsIm1hdHJpY3VsYSI6IjIwMjAyMDY3NTU5Iiwibm9tZSI6IlNhYnJpbmEiLCJhcmVhQXR1YWNhbyI6IlRlc3RlcyBkZSBTb2Z0d2FyZSIsImZvcm1hY2FvIjoiTWVzdHJhZG8gZW0gQ29tcHV0YcOnw6NvIn0sImV4cCI6MTYwODE0OTUwMCwiaWF0IjoxNjA4MTMxNTAwfQ.f1rE2uqxnDXq00UJMMfmp0sicWzPnmbvPZu9nfFnKfrLsWmTaJtejq5mRwBzSFS3cOqhEt-_Ij4ce2n_BRNGlw')

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />          
        </div>
    </BrowserRouter>