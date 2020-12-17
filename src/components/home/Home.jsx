import React from 'react'
import Main from '../template/Main'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default props =>
    <Main icon={faHome} title="Início"
        subtitle="Segundo Projeto do capítulo de React.">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-5 lead">Sistema gerenciador de projetos!</p>
        <p className="mb-0">Equipe de desenvolvimento:</p>
        <p className="mb-0 ml-3 text-muted">Adson de Macêdo Nascimento</p>
        <p className="mb-0 ml-3 text-muted">Thairam dos Santos Ataíde</p>
        <p className="mb-0 ml-3 text-muted">Ramon Rodrigues Salles</p>
    </Main>