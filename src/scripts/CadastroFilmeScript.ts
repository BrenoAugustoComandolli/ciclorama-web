import { PageScriptPadrao } from "./PageScriptPadrao";
import axios from 'axios';
import { Filme } from "../model/Filme";

class CadastroFilmeScript extends PageScriptPadrao {

    async carregarFilme(filmeId: number): Promise<Filme | null> {
        const token = sessionStorage.getItem('token-acesso');
        var resp: Filme | null = null;
        if (token) {
            await axios.get(
                'http://localhost:3001/buscarFilmePorId',
                {
                    params: { filmeId: filmeId },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                resp = response.data as Filme;
            }).catch(error => {
                if (error.response.status == 401) {
                    alert("Sem acesso ao recurso!");
                } else {
                    alert("Não foi possível retornar informações desse filme!");
                }
                throw new Error(error.response);
            });
        } else {
            alert("Sem acesso ao recurso!");
        }
        return resp;
    }

    async excluirFilme(filmeId: number) {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Boolean = false;
        if (token && usuarioId && filmeId) {
            await axios.delete(
                'http://localhost:3001/deletarFilme',
                {
                    params: {
                        filmeId: filmeId,
                        usuarioId: usuarioId
                    },
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

    async atualizarFilme(filmeId: number, nome: string, capaUrl: string, sinopse: string, trailerUrl: string, caminho: string) {
        if (!nome) {
            alert("Nome é obrigatório");
            return false;
        } else if (!caminho) {
            alert("Caminho do filme é obrigatório");
            return false;
        }
        return atualizarFilmeBanco(filmeId, nome, capaUrl, sinopse, trailerUrl, caminho);
    }

    async cadastrarFilme(nome: string, capaUrl: string, sinopse: string, trailerUrl: string, caminho: string): Promise<boolean> {
        if (!nome) {
            alert("Nome é obrigatório");
            return false;
        } else if (!caminho) {
            alert("Caminho do filme é obrigatório");
            return false;
        }
        return await cadastrarFilmeComBanco(nome, capaUrl, sinopse, trailerUrl, caminho);
    }

}

async function atualizarFilmeBanco(filmeId: number, nome: string, capaUrl: string, sinopse: string, trailerUrl: string, caminho: string) {
    const usuarioId = sessionStorage.getItem('usuario-id');
    const token = sessionStorage.getItem('token-acesso');
    var resp: boolean = false;
    if (token && usuarioId) {
        await axios.put(
            'http://localhost:3001/atualizarFilme',
            {
                filme: {
                    id: filmeId,
                    nome: nome,
                    capaUrl: capaUrl,
                    sinopse: sinopse,
                    caminho: caminho,
                    trailerUrl: trailerUrl,
                    usuarioId: usuarioId
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

async function cadastrarFilmeComBanco(nome: string, capaUrl: string, sinopse: string, trailerUrl: string, caminho: string): Promise<boolean> {
    const usuarioId = sessionStorage.getItem('usuario-id');
    const token = sessionStorage.getItem('token-acesso');
    var resp: boolean = false;
    if (token && usuarioId) {
        await axios.post(
            'http://localhost:3001/cadastrarFilme',
            {
                filme: {
                    nome: nome,
                    capaUrl: capaUrl,
                    sinopse: sinopse,
                    caminho: caminho,
                    trailerUrl: trailerUrl,
                    usuarioId: usuarioId
                }
            },
            {
                headers: { "x-access-token": token }
            }
        ).then(response => {
            if (response.status == 201) {
                resp = true;
            }
        }).catch(error => {
            alert(error)
            if (error.response.data.mensagemErro) {
                alert(error.response.data.mensagemErro);
            } else {
                alert("Não foi possível cadastrar o filme!")
            }
        });
    }
    return resp;
}

export default new CadastroFilmeScript();