import { Link } from 'react-router-dom';
import '../styles/cadastradoSucesso.css';

export function CadastradoSucesso() {

  return (
    <div id="container-sucesso">
      <div id="box-sucesso">
        <strong id="titulo-sucesso" className="titulo">Ciclorama</strong>
        <h1 id="h1-sucesso">Usuário cadastrado com sucesso</h1>
        <p id="aviso-voltar">Para voltar à tela de login clique <Link to="/Login" id="aqui-sucesso">Aqui</Link></p>
      </div>
    </div>
  );

}