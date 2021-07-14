import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


//a rota vai redirecionar para o componente login, se caso nao
// exita um UsuárioAtual (currentUser) logado
//ISSO EVITA QUE OUTRAS ROTAS SEJAM ACESSADAS PELA DIGITAÇÃO NA BARRA DE ENDEREÇO
export function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth();

    return (
        <Route {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}>

        </Route>

    )
}
