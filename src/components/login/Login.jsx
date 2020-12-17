import axios from 'axios'
import React, { Component } from 'react'
import { URI } from '../../config/config'
import { storeToken } from '../../service/auth'
import SingleFormMain from '../template/SingleFormMain'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import Cadastro from '../cadastro/Cadastro'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

const headerProps = {
    icon: faSignInAlt,
    title: 'Login',
    subtitle: 'Faça seu login para utilizar o sistema'
}

const baseUrl = 'login'

const initialState = {
    user: {
        username: '',
        senha: ''
    },
    modo: 'login'
}

export default class Login extends Component {

    state = { ...initialState }

    handleSubmit(event) {
        event.preventDefault();
    }

    login() {
        const user = this.state.user

        axios({
            method: 'post',
            url: `${URI}/${baseUrl}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: user.username,
                senha: user.senha
            }
        }).then(resp => {
            storeToken(resp.data.jwtToken)
            alert(`Login realizado com sucesso`)
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    setModo(modo) {
        this.setState({ modo })
    }

    renderCadastro() {
        return (
            <React.Fragment>
                <Cadastro setModo={this.setModo.bind(this)}/>
            </React.Fragment>
        )
    }

    // renderForm() {
    //     return (
    //         <div className="form">
    //             <div className="row">
    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Matricula</label>
    //                         <input type="text" className="form-control"
    //                             name="username"
    //                             value={this.state.user.username}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite a matricula..." />
    //                     </div>
    //                 </div>

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Senha</label>
    //                         <input type="password" className="form-control"
    //                             name="senha"
    //                             value={this.state.user.senha}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite a senha..." />
    //                     </div>
    //                 </div>

    //                 <hr />
    //                 <div className="col-12 d-flex justify-content-end">
    //                     <button className="btn btn-success"
    //                         onClick={e => this.login()}>
    //                         Entrar
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    renderForm() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <form size="lg" controlId="matricula">
                        <label>Matricula</label>
                        <input type="text" className="form-control"
                            name="username"
                            value={this.state.user.username}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a matricula..."
                        />
                    </form>
                    <form size="lg" controlId="senha">
                        <label>Senha</label>
                        <input type="password" className="form-control"
                            name="senha"
                            value={this.state.user.senha}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a senha..."
                        />
                    </form>
                    <hr />
                    <Button block size="lg" type="submit" className="btn-success"
                        onClick={e => this.login()}>
                        Login
                    </Button>

                    <Button block size="lg" type="submit"
                        onClick={e => this.setModo("cadastro")}>
                        Cadastrar Usuário
                    </Button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <SingleFormMain {...headerProps}>
                {this.state.modo === 'login' && this.renderForm()}
                {this.state.modo === 'cadastro' && this.renderCadastro()}
            </SingleFormMain>
        )
    }
}



{/* <div className="d-flex bd-highlight mb-3">
    <div className="mr-auto p-2 bd-highlight">
        <button className="btn btn-success mr-5"
            onClick={e => this.login()}>
            Cadastrar
    </button>
    </div>

    <div className="ml-auto p-2 bd-highlight">
        <button className="btn btn-success"
            onClick={e => this.login()}>
            Fazer login
    </button>
    </div>
</div> */}