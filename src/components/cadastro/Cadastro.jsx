import React, { Component } from 'react'

import Main from '../template/Main'
import CadastroAluno from './CadastroAluno'
import CadastroProfessor from './CadastroProfessor'

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const headerProps = {
    icon: faSignInAlt,
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
            <Main { ...headerProps }>
                <label>
                    <input
                        type="radio"
                        name="tipo"
                        value="aluno"
                        checked={this.state.aluno}
                        onChange={(e) => this.updateField(e, true)}
                    />Aluno
                </label>

                <label>
                    <input
                        type="radio"
                        name="tipo"
                        value="professor"
                        checked={!this.state.aluno}
                        onChange={(e) => this.updateField(e, false)}
                    />Professor
                </label>

                {this.state.aluno && <CadastroAluno />}
                {!this.state.aluno && <CadastroProfessor />}
            </Main>
        )
    }
}