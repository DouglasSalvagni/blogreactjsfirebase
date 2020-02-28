import React, { useState, useEffect } from 'react';
import {Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import { Editor } from '@tinymce/tinymce-react';

const New = (props) => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        if(!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
    }, [])

    const cadastrar = async (e) => {
        e.preventDefault();

        if(title !== '' && image !== '' && description !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;

            await posts.child(chave).set({
                titulo: title,
                imagem: image,
                descricao: description,
                autor: localStorage.name
            });
        } else {
            setAlert('Preencha corretamente todos os campos')
            return null
        }

        props.history.push('/dashboard')
    }

    useEffect(() => {console.log(description)}, [description])

    return(
        <div className='container'>
            <div className='form-new-container p-4'>
                <header className='text-center'>
                    <Link className='btn btn-danger mb-3' to='/dashboard'>Voltar</Link>
                    <span className='bg-danger text-white mt-2 mb-2 d-block'>{alert}</span>
                </header>
                <form onSubmit={cadastrar} className='form-row'>
                    
                    <label>Título:</label>
                    <input className='form-control mb-2' type='text' autoFocus placeholder='Nome do post' value={title} 
                        onChange={(e) => setTitle(e.target.value)}/>

                    <label>Imagem:</label>
                    <input className='form-control mb-2' type='text' placeholder='Url do post' value={image} 
                        onChange={(e) => setImage(e.target.value)}/>

                    <label>Descriçao:</label>
                    {/* <textarea className='form-control mb-2' type='text' placeholder='Descrição...' value={descricao} 
                        onChange={(e) => this.setState({descricao: e.target.value})}/> */}
                    <Editor
                        initialValue="<p>This is the initial conten of the editor</p>"
                        className="bg-danger"
                        init={{
                        width: "100%",
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => setDescription(content)}
                    />

                    <button className='btn btn-primary btn-block mb-4' type='submit'>Postar</button>
                </form>
            </div>
        </div>
    );
}

export default New;