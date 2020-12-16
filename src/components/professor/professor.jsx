import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';
import { URI } from '../../config/config'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../service/auth'

const headerProps = {
    icon: faChalkboardTeacher,
    title: 'Professores',
    subtitle: 'Lista de professores'
}

//const baseUrl = "localhost:8080/api/alunos"
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
    mostrarForm: false,
    mostrarList: false,
}

export default class ProfessorCrud extends Component {

    state = { ...initialState }

    handleClick() {
        this.setState({
            mostrarForm: true
        })
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
        this.setState({ prof: initialState.prof })
    }

    save() {
        const prof = this.state.prof
        const method = prof.id ? 'put' : 'post'
        const url = prof.id ? `${baseUrl}/${prof.id}` : baseUrl
        axios[method](url, prof)
        axios.post(baseUrl, prof)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ prof: initialState.prof, list })
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

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
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
                                value={this.state.prof.formacao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a sua formação..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            // onClick={e => this.clear(e)}>
                            onClick={e => this.setState({ mostrarForm: false})}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(prof) {
        this.setState({ prof })
    }

    remove(prof) {

        axios.delete(`${URI}/${baseUrl}/${prof.id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(resp => {
            const list = this.getUpdatedList(prof, false)
            this.setState({ list })
            alert(`Professor: ${prof.nome} deletado com sucesso`)
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
        console.log(prof)
        console.log(`${URI}/${baseUrl}/${prof.id}`)
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
                            onClick={() => this.handleClick()}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                    {/* <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(prof)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(prof)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td> */}
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.state.mostrarForm && this.renderForm()}
                {!this.state.mostrarForm && this.renderTable()}
            </Main>
        )
    }
}