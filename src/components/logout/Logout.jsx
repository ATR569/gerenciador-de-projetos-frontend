import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { removeToken } from '../../service/auth'

export default class Logout extends Component {
    render() {
        removeToken()

        
        return (
            <React.Fragment>
                <Redirect to="/" push={true} >
                </Redirect>
            </React.Fragment>
        )
    }
}