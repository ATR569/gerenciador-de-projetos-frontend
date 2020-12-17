import axios from 'axios'
import React, { Component } from 'react'
import { URI } from '../../config/config'
import { storeToken } from '../../service/auth'
import Main from '../template/Main'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

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
    }
}

export default class Login extends Component {

    state = { ...initialState }

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

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Matricula</label>
                            <input type="text" className="form-control"
                                name="username"
                                value={this.state.user.username}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a matricula..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="senha"
                                value={this.state.user.senha}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>

                    <hr />
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success"
                            onClick={e => this.login()}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}