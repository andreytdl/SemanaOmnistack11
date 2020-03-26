import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import './styles.css';

//Icone do FeatherIcons de login
import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(event){
        event.preventDefault();
        
        try{
            const response = await api.post('session', {id});
            console.log(response.data.name);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile')

        }catch{
            alert('Falha no login, tente novamente!')
        }

    }

    return(
        <>
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg}/>

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>
                        <input 
                            placeholder="Sua ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <button className="button" type ="submit">Entrar</button>
                        <Link className="back_link" to="/register">
                            <FiLogIn size={16} color="#E02041"/>
                            Não tenho cadastro
                        </Link>
                    </form>


                </section>
                
                {/*alt = texto caso a imagem nn aparecer */}
                <img src={heroesImg} alt="Heroes"/> 

            </div>
        </>
    );
}