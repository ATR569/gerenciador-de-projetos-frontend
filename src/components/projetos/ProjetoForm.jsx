import axios from 'axios'
import React, { Component } from 'react'
import { URI } from '../../config/config'
import { getToken } from '../../service/auth'

const baseUrl = 'api/professores'

const initialState = {
    projeto: { }
}

export default class Login extends Component {

    state = { ...initialState }

    save() {
        const idProfessor = this.props.coordenador.id
        const projeto = this.state.projeto

        axios({
            method: 'post',
            url: `${URI}/${baseUrl}/${idProfessor}/projetos`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            data: {
                nome: projeto.nome,
                descricao: projeto.descricao
            }
        }).then(() => {
            alert(`Projeto cadastrado com sucesso`)
            this.props.setModo && this.props.setModo('form')
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    updateField(event) {
        const projeto = { ...this.state.projeto }
        projeto[event.target.name] = event.target.value
        this.setState({ projeto })
    }

    renderToolbar() {
        return (
            <div className="row">
                <div className="col-12 d-flex justify-content-end ml-1">
                    <button className="btn btn-secondary ml-2"
                        onClick={e => {
                            this.props.setModo && this.props.setModo('form')
                        }}>
                        Cancelar
                    </button>

                    <button className="btn btn-primary ml-2"
                        onClick={e => {
                            this.save()
                        }}>
                        Salvar
                    </button>
                </div>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Nome do projeto</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.projeto.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="O nome do projeto..." />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <label>Descrição do Projeto</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.projeto.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a descrição do projeto..." />
                        </div>
                    </div>

                    <hr />
                    {this.renderToolbar()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                { this.renderForm() }
            </React.Fragment>
        )
    }
}