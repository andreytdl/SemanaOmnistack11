import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

//Icone do FeatherIcons de login
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile(){
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory();

    const [incidents, setIncidents] = useState([])

    //Executa assim que a tela é inicializada
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
            console.log(response.data)

        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            
            //Atualização do Delete em tempo real
            //Estamos filtrando e mostrando somente o incidente que não é igual ao id removido
            setIncidents(incidents.filter(incident => incident.id != id));

        } catch(err){
            alert('Erro ao deletar o caso!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        {/* Intl é uma biblioteca de mascara para data, moedas, etc...  */}
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3"/>
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    );
}