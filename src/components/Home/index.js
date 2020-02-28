import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import parse from 'html-react-parser';

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let arr = [];
      snapshot.forEach((childItem) => {
        arr.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          imagem: childItem.val().imagem,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor
        })
      });

      posts.reverse();

      setPosts(arr)
    })
  }, [])

  return (
    <section id='posts' className='container'>
      <div className='container'>
        {posts && posts.map((post) => {
          return(
            <article key={post.key}>
              <header>
                <div className='title'>
                  <strong>{post.titulo}</strong>
                  <span>Autor: {post.autor}</span>
                </div>
              </header>
              <img src={post.imagem} alt='Capa do post' />
              <footer>
                <p>{parse(post.descricao)}</p>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Home;