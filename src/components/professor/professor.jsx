import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';
import { URI } from '../../config/config'
import { faChalkboardTeacher, faProjectDiagram, faEye} from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../service/auth'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerProps = {
    icon: faChalkboardTeacher,
    title: 'Professores',
    subtitle: 'Lista de professores'
}

const baseUrl = 'api/professores'

const initialState = {
    prof: {
        id: '',
        matricula: '',
        nome: '',
        senha: '',
        areaAtuacao: '',
        formacao: ''
    },
    list: [],
    modoForm: false,
}

export default class ProfessorCrud extends Component {

    state = { ...initialState }

    handleClick(prof) {
        this.setState({
            modoForm: true
        })

        this.load(prof)
    }

    componentWillMount() {
        axios(`${URI}/${baseUrl}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(resp => {
                this.setState({ list: resp.data })
            })
            .catch(err => {
                const erro = err.response.data
                alert(`ERRO ${erro.status}: ${erro.descricao}`)
            })
    }

    clear() {
        this.setState({ prof: initialState.prof, modoForm: false })
    }

    put() {
        const prof = this.state.prof

        axios({
            method: 'put',
            url: `${URI}/${baseUrl}/${prof.id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            data: {
                nome: prof.nome,
                senha: prof.senha,
                areaAtuacao: prof.areaAtuacao,
                formacao: prof.formacao
            }
        }).then(resp => {
            const list = this.getUpdatedList(prof, false)
            this.setState({ list })
            alert(`Professor: ${prof.nome} editado com sucesso`)
            this.setState({ modoForm: false })
            window.location.reload()
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    getUpdatedList(prof, add = true) {
        const list = this.state.list.filter(u => u.id !== prof.id)
        if (add) list.unshift(prof)
        return list
    }

    updateField(event) {
        const prof = { ...this.state.prof }
        prof[event.target.name] = event.target.value
        this.setState({ prof })
    }

    load(prof) {
        this.setState({ prof })
    }

    remove() {
        const prof = this.state.prof

        axios({
            method: 'delete',
            url: `${URI}/${baseUrl}/${prof.id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        }).then(resp => {
            const list = this.getUpdatedList(prof, false)
            this.setState({ list })
            alert(`Professor: ${prof.nome} deletado com sucesso`)
            this.setState({ modoForm: false })
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    renderToolbar() {
        const prof = this.state.prof
        const { usuario } = jwt_decode(getToken())

        if (prof.matricula === usuario.matricula) {
            return (
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-danger"
                            onClick={e => this.remove(e)}>
                            Remover Usuário
                            </button>

                        <button className="btn btn-primary ml-5"
                            onClick={e => this.put(e)}>
                            Salvar
                            </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                            </button>

                        <button className="btn btn-warning ml-2"
                            onClick={e => this.clear(e)}>
                            <FontAwesomeIcon icon={faProjectDiagram} /> Criar Projeto
                            </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-secondary ml-2"
                    onClick={e => this.clear(e)}>
                    Voltar
                </button>
            </div>
        )
    }

    renderForm() {
        const prof = this.state.prof
        const { usuario } = jwt_decode(getToken())

        const permitirEditar = prof.matricula === usuario.matricula

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                readOnly={!permitirEditar}
                                value={this.state.prof.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="senha"
                                readOnly={!permitirEditar}
                                value={this.state.prof.senha}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Área Atuação</label>
                            <input type="text" className="form-control"
                                name="areaAtuacao"
                                readOnly={!permitirEditar}
                                value={this.state.prof.areaAtuacao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a área de atuação..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Formação</label>
                            <input type="text" className="form-control"
                                name="formacao"
                                readOnly={!permitirEditar}
                                value={this.state.prof.formacao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a sua formação..." />
                        </div>
                    </div>
                </div>
                <hr />
                {this.renderToolbar()}
            </div>
        )
    }


    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Área de atuação</th>
                        <th>Formação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(prof => {
            return (
                <tr key={prof.id}>
                    <td>{prof.id}</td>
                    <td>{prof.matricula}</td>
                    <td>{prof.nome}</td>
                    <td>{prof.areaAtuacao}</td>
                    <td>{prof.formacao}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.handleClick(prof)}>
                            <FontAwesomeIcon icon={faEye}/>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.state.modoForm && this.renderForm()}
                {!this.state.modoForm && this.renderTable()}
            </Main>
        )
    }
}