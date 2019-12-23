import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import { app } from 'firebase';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        //verificar se há usuário logado
        if(firebase.getCurrent()) {
            return this.props.history.replace('/dashboard')
        }
    }

    entrar(e) {

        e.preventDefault();

        this.login();
    }

    login = async () => {
        const {email, password} = this.state;

        try {

            await firebase.login(email, password)
            .catch((err) => {
                if (err.code === 'auth/user-not-found') {
                    alert('Este usuário não existe');
                } else {
                    alert('Código do erro: ' + err.code);
                    return null;
                }
            });
            this.props.history.replace('/dashboard')

        }

        catch(error) {
            alert(error.message);
        }
    }

    render() {
        return(
            <div className='container'>
                <div className='form-login-container p-5'>
                    <form className='form-row' onSubmit={this.entrar}>
                        <label>Email:</label>
                        <input className='form-control' type='email' autoComplete='off' autoFocus value={this.state.email} 
                            onChange={(e) => {this.setState({email: e.target.value})}} placeholder='teste@teste.com' />
                        <label>Password:</label>
                        <input className='form-control mb-2' type='password' autoComplete='off' value={this.state.password} 
                            onChange={(e) => {this.setState({password: e.target.value})}} placeholder='Sua senha' />    
                        <button type='submit' className='btn btn-primary'> Submit</button>   
                        <Link className='mt-2' to='/register'>Ainda não possui uma conta?</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login)