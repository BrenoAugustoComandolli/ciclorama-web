import { Usuario } from '../model/Usuario';
import axios from 'axios';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class LoginScript {

    async logar(email: string, senha: string): Promise<boolean> {
        if (!email) {
            alert("E-mail é obrigatório");
            return false;
        } else if (!senha) {
            alert("Senha é obrigatório");
            return false;
        }
        return realizarAutenticacao(email, senha);
    }

}

async function realizarAutenticacao(email: string, senha: string): Promise<boolean> {
    try {
        const response = await axios.post(
            'http://localhost:3001/logar',
            {
                email: email,
                senha: senha
            }
        );
        if (response.status !== 401 && response.data.token) {
            return salvarInformacoesSession(email, response.data.token);
        }
        return false;
    } catch (err) {
        alert('E-mail e/ou senha inválido(s)!');
        return false;
    }

}

async function salvarInformacoesSession(email: string, token: string): Promise<boolean> {
    sessionStorage.setItem('token-acesso', token);
    const usuario = await buscarUsuarioPorEmail(email);
    if (usuario) {
        sessionStorage.setItem('usuario-id', usuario.id.toString());
        return true;
    }
    return false;
}

async function buscarUsuarioPorEmail(email: string): Promise<Usuario> {
    const token = sessionStorage.getItem('token-acesso');
    var resp: Usuario = {} as Usuario;
    if (token) {
        await axios.get(
            'http://localhost:3001/buscarUsuarioPorEmail',
            {
                params: { email: email },
                headers: { "x-access-token": token }
            }
        ).then(response => {
            resp = response.data as Usuario;
        }).catch(error => {
            if (error.response.status == 401) {
                alert("Sem acesso ao recurso!");
            } else {
                alert("Erro inesperado!");
            }
        });
    } else {
        alert("Sem acesso ao recurso!");
    }
    return resp;
}

export default new LoginScript();



