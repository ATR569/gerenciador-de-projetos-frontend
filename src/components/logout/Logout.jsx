import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { removeToken } from '../../service/auth'

export default class Logout extends Component {
    render() {
        removeToken()

        {window.location.reload()}

        return (
            <React.Fragment>
                <Redirect to="/home" push={true} />
            </React.Fragment>
        )
    }
}