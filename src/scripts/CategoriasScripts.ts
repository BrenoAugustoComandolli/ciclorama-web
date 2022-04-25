import { PageScriptPadrao } from "./PageScriptPadrao";
import axios from 'axios';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class CategoriasScripts extends PageScriptPadrao {

  async salvarCategoria(nome: string) {
    const usuarioId = sessionStorage.getItem('usuario-id');
    const token = sessionStorage.getItem('token-acesso');
    var resp: Boolean = false;
    if (token && usuarioId) {
      await axios.post(
        'http://localhost:3001/cadastrarCategoria',
        {
          categoria: {
            nome: nome,
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
        if (error.response.status == 401) {
          alert("Sem acesso ao recurso!");
          throw new Error(error.response);
        } else if (error.response.data.mensagemErro) {
          alert(error.response.data.mensagemErro);
        } else {
          alert("Erro inesperado!");
        }
      });
    } else {
      alert("Sem acesso ao recurso!");
    }
    return resp;
  }

  async excluirCategoria(nomeCategoria: string) {
    const usuarioId = sessionStorage.getItem('usuario-id');
    const token = sessionStorage.getItem('token-acesso');
    var resp: Boolean = false;
    if (token && usuarioId) {
      await axios.delete(
        'http://localhost:3001/deletarCategoria',
        {
          params: {
            nomeCategoria: nomeCategoria,
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
        } else if (error.response.data.mensagemErro) {
          alert(error.response.data.mensagemErro);
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

export default new CategoriasScripts();