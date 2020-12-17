import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faHome, faSignOutAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { login } from '../../service/auth'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Início
            </Link>
            <Link to="/professores">
                <FontAwesomeIcon icon={faChalkboardTeacher} /> Professores
            </Link>
            <Link to="/projetos">
                <FontAwesomeIcon icon={faProjectDiagram} /> Projetos
            </Link>
            <Link to="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} /> Sair
            </Link>
        </nav>
    </aside>