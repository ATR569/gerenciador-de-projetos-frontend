import React, { Component } from 'react'

import Main from '../template/Main'
import CadastroAluno from './CadastroAluno'
import CadastroProfessor from './CadastroProfessor'

import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

const headerProps = {
    icon: faUserPlus,
    title: 'Cadastro de Usuários',
    subtitle: 'Alunos e Professores'
}

export default class Cadastro extends Component {

    state = { aluno: true }

    updateField(event, bool) {
        let aluno = { ...this.state.aluno }
        aluno = bool
        this.setState({ aluno })
    }

    render() {
        return (
            <Main {...headerProps}>
                <Form.Group>
                    <p className="col-12 lead text-muted">Tipo de Usuário</p>
                    <Form.Label className="d-flex-collumn ml-3">
                        <input
                            className="mr-1"
                            type="radio"
                            name="tipo"
                            value="aluno"
                            checked={this.state.aluno}
                            onChange={(e) => this.updateField(e, true)}
                        />Aluno
                    </Form.Label>

                    <Form.Label className="d-flex-collumn ml-3">
                        <input
                            className="mr-1"
                            type="radio"
                            name="tipo"
                            value="professor"
                            checked={!this.state.aluno}
                            onChange={(e) => this.updateField(e, false)}
                        />Professor
                    </Form.Label>
                    <hr />
                </Form.Group>

                {this.state.aluno && <CadastroAluno />}
                {!this.state.aluno && <CadastroProfessor />}
            </Main>
        )
    }
}