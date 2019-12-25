import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import { app } from 'firebase';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:''
        };

        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);

    }

    register(e) {

        e.preventDefault();

        this.onRegister();

    }

    onRegister = async () => {
        
        const { name, email, password } = this.state;

        try {

            await firebase.register(email, password, name);
            this.props.history.replace('/dashboard');
        }

        catch(error) {
            alert(error)
        }
    }


    render() {
        return(
            <div className='container'>
                <div className='form-register-container p-5 text-center'>
                    <h2 className='mb-4'>Registre-se</h2>
                    <form className='form-row' onSubmit={this.register}>
                        <label>Nome:</label>
                        <input className='form-control mb-2' type='text' autoComplete='off' autoFocus value={this.state.name} 
                            onChange={(e) => {this.setState({name: e.target.value})}} placeholder='Seu nome' />
                        
                        <label>Email:</label>
                        <input className='form-control mb-2' type='email' autoComplete='off' value={this.state.email} 
                            onChange={(e) => {this.setState({email: e.target.value})}} placeholder='Exemplo: Fulano@gmail.com' />
                        
                        <label>Password:</label>
                        <input className='form-control mb-2' type='password' autoComplete='off' value={this.state.password} 
                            onChange={(e) => {this.setState({password: e.target.value})}} placeholder='Sua senha' />    
                        <button type='submit' className='btn btn-primary'> Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register)