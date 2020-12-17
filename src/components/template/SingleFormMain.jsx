import './Main.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment>
        {/* <Header {...props} /> */}
        <main className="content container-md w-50 h-30">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>