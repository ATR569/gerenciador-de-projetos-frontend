
import React, { Component } from 'react'

export default class Projeto extends Component {

    renderRows() {
        return this.props.colaboradores.map(colaborador => {
            return (
                <tr key={colaborador.id}>
                    <td>{colaborador.aluno.matricula}</td>
                    <td>{colaborador.aluno.nome}</td>
                    <td>{colaborador.papel}</td>
                </tr>
            )
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Aluno</th>
                        <th>Papel</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    render(){
        return (
            <div>
                <header>
                    <p className="lead text-muted">Colaboradores</p>
                </header>
                {this.renderTable()}
            </div>
        )
    }
}