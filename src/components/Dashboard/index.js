import React, { Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { app } from 'firebase';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.name
        };
    }

    async componentDidMount() {

        if(!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.name = info.val().name;
            this.setState({name: localStorage.name});
        })


    }

    logout = async () => {
        await firebase.logout()
        .catch((error) => {
            console.log(error)
        });

        localStorage.removeItem('name');
        this.props.history.push('/');
    }

    render() {

        return(
            <div className='container mt-5'>
                <div className='text-center'> 
                    <h1>Olá, {this.state.name}</h1>
                    <Link to='/dashboard/new'>Novo post</Link>
                    <p>Logado na conta: {firebase.getCurrent()} </p>
                    <button onClick={()=> this.logout()}>Logout</button>
                </div>
            </div>
        );
    }
}