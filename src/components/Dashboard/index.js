import React, { useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { app } from 'firebase';

const Dashboard = (props) => {

    const [name, setName] = useState(localStorage.name);

   const componentDidMount = async () => {

        if(!firebase.getCurrent()) {
            props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.name = info.val().name;
            setName(localStorage.name);
        })

    }

    const logout = async () => {
        await firebase.logout()
        .catch((error) => {
            console.log(error)
        });

        localStorage.removeItem('name');
        props.history.push('/');
    }

    return(
        <div className='container mt-5'>
            <div className='text-center'> 
                <h1>Olá, {name}</h1>
                <Link to='/dashboard/new'>Novo post</Link>
                <p>Logado na conta: {firebase.getCurrent()} </p>
                <button onClick={()=> logout()}>Logout</button>
            </div>
        </div>
    );
}

export default Dashboard;