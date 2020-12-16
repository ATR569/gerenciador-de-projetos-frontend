import React from 'react'
import Main from '../template/Main'
<<<<<<< HEAD
import ListaAlunos from '../alunos/ListaAlunos'
=======
import { faHome } from '@fortawesome/free-solid-svg-icons'
>>>>>>> 6430708a85e9c974810c9e33a07a1a0ba2e2eeb5

export default props =>
    <Main icon={faHome} title="Início"
        subtitle="Segundo Projeto do capítulo de React.">
        {/* <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para exemplificar a construção
    de um cadastro desenvolvido em React!</p> */}
        <ListaAlunos />
    </Main>