import { PageScriptPadrao } from "./PageScriptPadrao";
import { Usuario } from '../model/Usuario';
import axios from 'axios';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class EditarPerfilScript extends PageScriptPadrao {

    async carregarDadosUsuario(): Promise<Usuario | null> {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Usuario | null = null;
        if (token && usuarioId) {
            await axios.get(
                'http://localhost:3001/buscarUsuarioPorId',
                {
                    params: { id: usuarioId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data as Usuario;
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
        }
        return resp;
    }

    async excluirUsuario() {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Boolean = false;
        if (token && usuarioId) {
            await axios.delete(
                'http://localhost:3001/deletarUsuario',
                {
                    params: { usuarioId: usuarioId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                if (response.status == 200) {
                    resp = true;
                }
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
        }
        return resp;
    }

    async atualizarUsuario(nome: string, email: string, senha: string, imagemUrl: string) {
        if (!nome) {
            alert("Nome é obrigatório");
            return false;
        } else if (!email) {
            alert("E-mail é obrigatório");
            return false;
        }
        return atualizarUsuarioBanco(nome, email, senha, imagemUrl);
    }

}

async function atualizarUsuarioBanco(nome: string, email: string, senha: string, imagemUrl: string) {
    const usuarioId = sessionStorage.getItem('usuario-id');
    const token = sessionStorage.getItem('token-acesso');
    var resp: Boolean = false;
    if (token && usuarioId) {
        await axios.put(
            'http://localhost:3001/atualizarUsuario',
            {
                usuario: {
                    id: usuarioId,
                    nome: nome,
                    email: email,
                    senha: senha,
                    imagemUrl: imagemUrl
                }
            },
            {
                headers: { "x-access-token": token }
            }
        ).then(response => {
            if (response.status == 200) {
                resp = true;
            }
        }).catch(error => {
            if (error.response.data.mensagemErro) {
                alert(error.response.data.mensagemErro);
            } else if (error.response.status == 401) {
                alert("Sem acesso ao recurso!");
                throw new Error(error.response);
            } else {
                alert("Erro inesperado!");
            }
        });
    } else {
        alert("Sem acesso ao recurso!");
    }
    return resp;
}

export default new EditarPerfilScript();