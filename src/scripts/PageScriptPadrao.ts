export class PageScriptPadrao {

    verificarAutenticacao() {
        const token = sessionStorage.getItem('token-acesso');
        if (!token) {
            alert("Sem acesso ao recurso!");
            return false;
        }
        return true;
    }
    
}