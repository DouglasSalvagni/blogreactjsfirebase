import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import CKeditor from './ckeditor';


class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            titulo:'',
            imagem:'',
            descricao:'',
            alert:''
        };

        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount(){
        if(!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;

            await posts.child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.name
            });
        } else {
            this.setState({alert: 'Preencha corretamente todos os campos'})
            return null
        }

        this.props.history.push('/dashboard')
    }

    render(){

        return(
            <div className='container'>
                <div className='form-new-container p-4'>
                    <header className='text-center'>
                        <Link className='btn btn-danger mb-3' to='/dashboard'>Voltar</Link>
                        <span className='bg-danger text-white mt-2 mb-2 d-block'>{this.state.alert}</span>
                    </header>
                    <form onSubmit={this.cadastrar} className='form-row'>
                        
                        <label>Título:</label>
                        <input className='form-control mb-2' type='text' autoFocus placeholder='Nome do post' value={this.state.titulo} 
                            onChange={(e) => this.setState({titulo: e.target.value})}/>

                        <label>Imagem:</label>
                        <input className='form-control mb-2' type='text' placeholder='Url do post' value={this.state.imagem} 
                            onChange={(e) => this.setState({imagem: e.target.value})}/>

                        <label>Descriçao:</label>
                        <CKeditor/>

                        <button className='btn btn-primary btn-block mb-4' type='submit'>Postar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default New;