import { PageScriptPadrao } from './PageScriptPadrao';
import axios from 'axios';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class CadastroUsuarioScript extends PageScriptPadrao {

    async cadastrar(nome: string, email: string, senha: string) {
        if (!nome) {
            alert("Nome é obrigatório");
            return false;
        } else if (!email) {
            alert("E-mail é obrigatório");
            return false;
        } else if (!senha) {
            alert("Senha é obrigatório");
            return false;
        }
        return this.criarUsuario(nome, email, senha);
    }

    async criarUsuario(nome: string, email: string, senha: string): Promise<boolean> {
        var resp: boolean = false;
        await axios.post(
            'http://localhost:3001/cadastrarUsuario',
            {
                usuario: {
                    nome: nome,
                    email: email,
                    senha: senha
                }
            }
        ).then(response => {
            if (response.status == 201) {
                resp = true;
            }
        }).catch(error => {
            if (error.response.data.mensagemErro) {
                alert(error.response.data.mensagemErro);
            } else {
                alert("Não foi possível cadastrar o usuário!")
            }
        });
        return resp;
    }

}

export default new CadastroUsuarioScript();