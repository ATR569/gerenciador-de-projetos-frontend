import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';
import { URI } from '../../config/config'
import { faUserPlus, faEye, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../service/auth'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Projeto  from './Projeto'
import ColaboradorForm  from '../colaboradores/ColaboradorForm'

const headerProps = {
    icon: faProjectDiagram,
    title: 'Projetos',
    subtitle: 'Lista de projetos'
}

const baseUrl = 'api/projetos'

const initialState = {
    projeto: {
        id: '',
        nome: '',
        descricao: '',
        coordenador: {},
        colaboradores: []
    },
    list: [],
    modo: 'list',
}

export default class Projetos extends Component {

    state = { ...initialState }

    setModo(modo){
        this.setState({modo})
    }

    handleClick(projeto) {
        this.setState({
            modo: 'detail'
        })

        this.load(projeto)
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
        this.setState({ projeto: initialState.projeto, modo: 'list' })
    }

    getUpdatedList(projeto, add = true) {
        const list = this.state.list.filter(u => u.id !== projeto.id)
        if (add) list.unshift(projeto)
        return list
    }

    updateField(event) {
        const projeto = { ...this.state.projeto }
        projeto[event.target.name] = event.target.value
        this.setState({ projeto })
    }

    load(projeto) {
        this.setState({ projeto })
    }

    renderToolbar() {
        const coordenador = this.state.projeto.coordenador
        const { usuario } = jwt_decode(getToken())

        if (coordenador.matricula === usuario.matricula) {
            return (
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Voltar
                        </button>

                        <button className="btn btn-warning ml-2"
                            onClick={e => this.clear(e)}>
                            <FontAwesomeIcon icon={faUserPlus} /> Adicionar Colaborador
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

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricao</th>
                        <th>Coordenador</th>
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
        return this.state.list.map(projeto => {
            return (
                <tr key={projeto.id}>
                    <td>{projeto.id}</td>
                    <td>{projeto.nome}</td>
                    <td>{projeto.descricao}</td>
                    <td>{projeto.coordenador.nome}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.handleClick(projeto)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderProjeto(){
        return (
            <Projeto projeto={this.state.projeto} setModo={this.setModo.bind(this)} />
        )
    }

    renderColaboradorForm() {
        return (
            <ColaboradorForm projeto={this.state.projeto} setModo={this.setModo.bind(this)} />
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.state.modo === 'detail' && this.renderProjeto()}
                {this.state.modo === 'list' && this.renderTable()}
                {this.state.modo === 'form' && this.renderColaboradorForm()}
            </Main>
        )
    }
}