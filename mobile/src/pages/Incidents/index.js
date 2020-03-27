import React, { useEffect, useState} from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    //Questão de rolagem e paginação
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident){
        navigation.navigate('Details', { incident } );
    }

    async function loadIncidents(){
        
        //Uma req por vez, para nn acontecer do usuário ficar descendo sem parar e enviando varios req para a nossa api
        if(loading){
            return;
        }

        //incidents.length - a quantidade de incidentes que tenho mostrando na minha
        //lista
        if(total > 0 && incidents.length == total){
            //Nn faz sentido buscar mais informações
            return;
        }

        setLoading(true);
        
        const response = await api.get(`incidents`, {
            params: { page }
        });
        

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
        console.log('Numero de paginas: ', page, 'total: ', total)
    }

    useEffect(() => {
        loadIncidents();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
    Total de <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList 
            //esse data é o tanto de vezes que irá repetir
            data={incidents}
            style={styles.incidentsList}
            //Quando atingir o final da lista ele carrega novamente
            onEndReached={loadIncidents}
            //Quantos porcento o usuário deve estar do final para que comece a carregar a lista novamente?
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={true}
            keyExtractor={incident => String(incident.id)}
            
            // Por padrão recebemos o item 'item' e agor estamos
            // passando o valor dele para uma variavel chamada incident
            renderItem={({ item : incident}) => (

                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'}).format(incident.value)}
                    </Text>

                    
                    <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>

                </View>


            )}
            />
        </View>
    );
}