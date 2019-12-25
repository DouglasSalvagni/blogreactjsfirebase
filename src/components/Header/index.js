import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className='header'>
                <div className='container p-2'>
                    <div className='header-content'>
                        <Link to="/">
                            Blog Programador
                        </Link>
                        <Link to="/login">
                            Entrar
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;