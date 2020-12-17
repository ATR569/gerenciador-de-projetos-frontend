import React, { Component } from 'react';
import axios from 'axios';
import { URI } from '../../config/config'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../service/auth'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Colaboradores from '../colaboradores/Colaboradores'

const baseUrl = 'api/projetos'

const initialState = {
    projeto: {
        id: '',
        nome: '',
        descricao: '',
        coordenador: {},
        colaboradores: []
    }
}

export default class Projeto extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(`${URI}/${baseUrl}/${this.props.projeto.id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        .then(resp => {
            this.setState({ projeto: resp.data })
        })
        .catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
    }

    renderToolbar() {
        const coordenador = this.state.projeto.coordenador
        const { usuario } = jwt_decode(getToken())

        if (coordenador.matricula === usuario.matricula) {
            return (
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.props.setModoForm('list')}>
                            Voltar
                        </button>

                        <button className="btn btn-warning ml-2"
                            onClick={e => this.clear(e)}>
                            <FontAwesomeIcon icon={faAddressCard} /> Adicionar Colaborador
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-secondary ml-2"
                    onClick={e => this.props.setModoForm('list')}>
                    Voltar
                </button>
            </div>
        )
    }

    renderProjeto() {
        const projeto = this.state.projeto
        return (
            <div className="form">
                <p className="text-muted lead">Projeto</p>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Projeto</label>
                            <p className="text-muted">{projeto.nome}</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Professor Coordenador</label>
                            <p className="text-muted">{projeto.coordenador.nome}</p>
                        </div>
                    </div>


                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Descrição</label>
                            <p className="text-muted">{projeto.descricao}</p>
                        </div>
                    </div>
                </div>

                <hr />
                {this.renderToolbar()}
                <hr />
                <Colaboradores colaboradores={projeto.colaboradores || []}/>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderProjeto()}
            </React.Fragment>
        )
    }
}