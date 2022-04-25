import axios from "axios";
import { Filme } from "../model/Filme";
import { PageScriptPadrao } from "./PageScriptPadrao";

class ExibicaoFilmeScript extends PageScriptPadrao {

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

}

export default new ExibicaoFilmeScript();