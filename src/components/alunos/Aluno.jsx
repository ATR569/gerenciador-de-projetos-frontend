import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { URI } from '../../config/config'
import { faEye, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../service/auth'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerProps = {
    icon: faUserGraduate,
    title: 'Alunos',
    subtitle: 'Lista de Alunos'
}

const baseUrl = 'api/alunos'

const initialState = {
    aluno: { nome: '', curso: '', senha: '' },
    list: [],
    modoForm: false,
}

export default class ListaAlunos extends Component {

    state = { ...initialState }

    handleClick(aluno) {
        this.setState({
            modoForm: true
        })

        this.load(aluno)
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
        this.setState({ aluno: initialState.aluno, modoForm: false })
    }

    put() {
        const aluno = this.state.aluno

        axios({
            method: 'PUT',
            url: `${URI}/${baseUrl}/${aluno.id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            data: {
                nome: aluno.nome,
                senha: aluno.senha,
                curso: aluno.curso
            }
        }).then(res => {
            const list = this.getUpdatedList(aluno, false)
            alert(`Aluno: ${aluno.nome} editado com sucesso`)
            this.setState({ list })
            this.setState({ modoForm: false })
            window.location.reload();
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    getUpdatedList(aluno, add = false) {
        const list = this.state.list.filter(a => a.id !== aluno.id)
        if (add) list.unshift(aluno)
        return list
    }

    updateField(event) {
        const aluno = { ...this.state.aluno }
        aluno[event.target.name] = event.target.value
        this.setState({ aluno })
    }

    load(aluno) {
        this.setState({ aluno })
    }

    remove() {
        const aluno = this.state.aluno

        axios({
            method: 'DELETE',
            url: `${URI}/${baseUrl}/${aluno.id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            const list = this.getUpdatedList(aluno, false)
            this.setState({ list })
            alert(`Aluno: ${aluno.nome} deletado com sucesso`)
            this.setState({ modoForm: false })
            window.location.reload();
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    renderToolbar() {
        const alunoLogado = this.state.aluno
        const { usuario } = jwt_decode(getToken())

        if (alunoLogado.matricula === usuario.matricula) {
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
        const alunoLogado = this.state.aluno
        const { usuario } = jwt_decode(getToken())

        const permitirEditar = alunoLogado.matricula === usuario.matricula

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                readOnly={!permitirEditar}
                                value={this.state.aluno.nome}
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
                                value={this.state.aluno.senha}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Curso</label>
                            <input type="text" className="form-control"
                                name="curso"
                                readOnly={!permitirEditar}
                                value={this.state.aluno.curso}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o curso..." />
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
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(aluno => {
            return (
                <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.curso}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.handleClick(aluno)}>
                            <FontAwesomeIcon icon={faEye} />
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