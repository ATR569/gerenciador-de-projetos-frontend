import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'users',
    title: 'Professores',
    subtitle: 'Área de professores: Listar, Alterar e Excluir!'
}

//const baseUrl = "https://gerenciador-de-projetos-back.herokuapp.com/api/professores"
//const baseUrl = "localhost:8080/api/alunos"
const baseUrl = "https://gerenciador-de-projetos-back.herokuapp.com/api/alunos"

const initialState = {
    prof: {
        id: '',
        matricula: '',
        nome: '',
        senha: '',
        areaAtuacao: '',
        formacao: ''
    },
    list: []
}

export default class ProfessorCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
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

    // renderForm() {
    //     return (
    //         <div className="form">
    //             <div className="row">
    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Nome</label>
    //                         <input type="text" className="form-control"
    //                             name="nome"
    //                             value={this.state.prof.nome}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o nome..." />
    //                     </div>
    //                 </div>

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Senha</label>
    //                         <input type="password" className="form-control"
    //                             name="senha"
    //                             value={this.state.prof.senha}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite a senha..." />
    //                     </div>
    //                 </div>

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Área Atuação</label>
    //                         <input type="text" className="form-control"
    //                             name="areaAtuacao"
    //                             value={this.state.prof.areaAtuacao}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite a área de atuação..." />
    //                     </div>
    //                 </div>

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Formação</label>
    //                         <input type="text" className="form-control"
    //                             name="formacao"
    //                             value={this.state.prof.formacao}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite a sua formação..." />
    //                     </div>
    //                 </div>
    //             </div>

    //             <hr />
    //             <div className="row">
    //                 <div className="col-12 d-flex justify-content-end">
    //                     <button className="btn btn-primary"
    //                         onClick={e => this.save(e)}>
    //                         Salvar
    //                     </button>

    //                     <button className="btn btn-secondary ml-2"
    //                         onClick={e => this.clear(e)}>
    //                         Cancelar
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    load(prof) {
        this.setState({ prof })
    }

    remove(prof) {
        axios.delete(`${baseUrl}/${prof.id}`).then(resp => {
            const list = this.getUpdatedList(prof, false)
            this.setState({ list })
        })
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
                            onClick={() => this.load(prof)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(prof)}>
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
                {/* {this.renderForm()} */}
                {this.renderTable()}
            </Main>
        )
    }
}