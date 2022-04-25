import { PageScriptPadrao } from './PageScriptPadrao';
import { Categoria } from '../model/Categoria';
import { Filme } from '../model/Filme';
import axios from 'axios';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class HomePageScript extends PageScriptPadrao {

    async carregarTodasCategoriasUsuario(): Promise<Categoria[]> {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Categoria[] = [];
        if (token) {
            await axios.get(
                'http://localhost:3001/listarCategoriasUsuario',
                {
                    params: { usuarioId: usuarioId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data as Categoria[];
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                    resp = [];
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
            resp = [];
        }
        return resp;
    }

    async carregarTodosFilmesUsuario(): Promise<Filme[]> {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Filme[] = [];
        if (token) {
            await axios.get(
                'http://localhost:3001/listarFilmesUsuario',
                {
                    params: { usuarioId: usuarioId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data as Filme[];
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                    resp = [];
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
            resp = [];
        }
        return resp;
    }

    async carregarFotoUsuario(): Promise<string> {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: string = '';
        if (token) {
            await axios.get(
                'http://localhost:3001/buscarUsuarioPorId',
                {
                    params: { id: usuarioId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data.imagemUrl;
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                    resp = '';
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
            resp = '';
        }
        return resp;
    }

    async buscarFilmesPorListaCategoria(nomeFilme: string, categoriasSelecionadas: number[]): Promise<Filme[]> {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Filme[] = [];
        if (token) {
            await axios.get(
                'http://localhost:3001/buscarFilmesPorListaCategoria',
                {
                    params: {
                        categorias: categoriasSelecionadas,
                        usuarioId: usuarioId,
                        nomeFilme: "%" + nomeFilme + '%'
                    },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data as Filme[];
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                    throw new Error(error.response);
                } else {
                    alert("Erro inesperado!");
                    resp = [];
                }
            });
        } else {
            alert("Sem acesso ao recurso!");
            resp = [];
        }
        return resp;
    }

    async deslogar() {
        const token = sessionStorage.getItem('token-acesso');
        if (token) {
            await axios.post(
                'http://localhost:3001/deslogar',
                {
                    headers: { "x-access-token": token }
                }
            );
        }
    }

}

export default new HomePageScript();