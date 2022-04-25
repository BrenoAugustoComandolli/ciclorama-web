import axios from 'axios';
import { PageScriptPadrao } from './PageScriptPadrao';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class VinculoFilmeCategoriaScript extends PageScriptPadrao {

    async salvarFilmeCategoria(filmeId: number, nomeCategoria: string) {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Boolean = false;
        if (token && usuarioId && filmeId && nomeCategoria) {
            await axios.post(
                'http://localhost:3001/definirCategoriaFilme',
                {
                    filmeId: filmeId,
                    nomeCategoria: nomeCategoria  
                },
                {
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                if (response.status == 201) {
                    resp = true;
                }
            }).catch(error => {
                if (error.response.data.mensagemErro) {
                    alert(error.response.data.mensagemErro);
                }else if (error.response.status == 401) {
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

    async excluirFilmeCategoria(filmeId: number, nomeCategoria: string) {
        const usuarioId = sessionStorage.getItem('usuario-id');
        const token = sessionStorage.getItem('token-acesso');
        var resp: Boolean = false;
        if (token && usuarioId && filmeId && nomeCategoria) {
            await axios.delete(
                'http://localhost:3001/removerCategoriaFilme',
                {
                    params: {
                        filmeId: filmeId,
                        nomeCategoria: nomeCategoria  
                    },
                    headers: { "x-access-token": token }
                }
            ).then(response => {
                if (response.status == 200) {
                    resp = true;
                }
            }).catch(error => {
                if (error.response.data.mensagemErro) {
                    alert(error.response.data.mensagemErro);
                }else if (error.response.status == 401) {
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

}

export default new VinculoFilmeCategoriaScript();