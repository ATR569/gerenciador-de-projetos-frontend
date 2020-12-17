import './SingleFormMain.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment>
        <main class="single-form">
            <div className=" single-form-content">
                {props.children}
            </div>
        </main>
    </React.Fragment>