import axios from 'axios'
import React, { Component } from 'react'
import { URI } from '../../config/config'
import { getToken } from '../../service/auth'

const baseUrl = 'api/projetos'

const initialState = {
    colaborador: {},
    alunos: []
}

export default class ColaboradorForm extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(`${URI}/api/alunos`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(resp => {
                this.setState({ alunos: resp.data })
            })
            .catch(err => {
                const erro = err.response.data
                alert(`ERRO ${erro.status}: ${erro.descricao}`)
            })
    }

    save() {
        const idProjeto = this.props.projeto.id
        const colaborador = this.state.colaborador

        axios({
            method: 'post',
            url: `${URI}/${baseUrl}/${idProjeto}/colaboradores`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            data: {
                idAluno: parseInt(colaborador.idAluno),
                papel: colaborador.papel
            }
        }).then(() => {
            alert(`Colaborador adicionado com sucesso`)
            this.props.setModo && this.props.setModo('detail')
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    updateField(event) {
        const colaborador = { ...this.state.colaborador }
        colaborador[event.target.name] = event.target.value
        this.setState({ colaborador })
    }

    renderToolbar() {
        return (
            <div className="row">
                <div className="col-12 d-flex justify-content-end ml-1">
                    <button className="btn btn-secondary ml-2"
                        onClick={e => {
                            this.props.setModo && this.props.setModo('detail')
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

    renderItems() {
        return this.state.alunos.map(aluno => {
            return (
                <option value={aluno.id}>{aluno.nome} - Matrícula:{aluno.matricula}</option>
            )
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Aluno</label>
                            <select className="form-control"
                                value={this.state.colaborador.aluno}
                                name="idAluno"
                                onChange={e => this.updateField(e)}>
                                    {this.renderItems()}
                                </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <label>Papel do aluno</label>
                            <input type="text" className="form-control"
                                name="papel"
                                value={this.state.colaborador.papel}
                                onChange={e => this.updateField(e)}
                                placeholder="Papel exercido pelo aluno..." />
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
                { this.renderForm()}
            </React.Fragment>
        )
    }
}