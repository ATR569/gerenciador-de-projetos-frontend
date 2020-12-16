import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Alunos',
    subtitle: 'Edição de alunos: Alterar e Excluir!'
}

const baseUrl = 'http://demo6232336.mockable.io/api/alunos'

const initialState = {
    aluno: { nome: '', matricula: '', curso: '' },
    list: []
}

export default class ListaAlunos extends Component {

    state = { ...initialState }
    
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ aluno: initialState.aluno })
    }

    save() {
        const aluno = this.state.aluno
        const method = aluno.id ? 'put' : 'post'
        const url = aluno.id ? `${baseUrl}/${aluno.id}` : baseUrl
        axios[method](url, aluno)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ aluno: initialState.aluno, list })
            })
    }

    getUpdatedList(aluno, add = true) {
        const list = this.state.list.filter(a => a.id !== aluno.id)
        if (add) list.unshift(aluno)
        return list
    }

    updateField(event) {
        const aluno = { ...this.state.aluno }
        aluno[event.target.name] = event.target.value
        this.setState({ aluno })
        // console.log("ALUNO: ", aluno);
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
                                value={this.state.aluno.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Matrícula</label>
                            <input type="text" className="form-control"
                                name="matricula"
                                value={this.state.aluno.matricula}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a matrícula..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Curso</label>
                            <input type="text" className="form-control"
                                name="curso"
                                value={this.state.aluno.curso}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o curso..." />
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
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(aluno) {
        this.setState({ aluno })
    }

    remove(aluno) {
        axios.delete(`${baseUrl}/${aluno.id}`).then(resp => {
            const list = this.getUpdatedList(aluno, false)
            this.setState({ list })
        })
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
                            onClick={(e) => this.load(aluno)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(aluno)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}