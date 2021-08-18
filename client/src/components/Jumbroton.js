import React, { Component } from 'react';
class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-1">Phone Book.</h1>
                    <p className="lead">Put your contacts here for better contacts management</p>
                </div>
            </div>
        )
    }
}

export default Jumbotron;