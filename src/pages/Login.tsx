import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginScript from '../scripts/LoginScript';
import '../styles/login.css';

export function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function logar() {
    if (await LoginScript.logar(email, senha)) {
      navigate("/HomePage");
    }
  }

  return (
    <div id="container-login">
      <div id="box-login">
        <strong id="titulo-login" className="titulo">Ciclorama</strong>
        <input id="email-login" onChange={(texto) => setEmail(texto.target.value)} type="email" placeholder="Usuário ou E-mail" />
        <input id="senha-login" type="password" onChange={(texto) => setSenha(texto.target.value)} placeholder="Senha" />
        <button id="botao-login" onClick={() => logar()}>Entre</button>
        <p id="ajuda-login">Ainda não tem cadastro? <Link to="/Cadastro" id="cadastre-se">Cadastre-se</Link></p>
      </div>
    </div>
  );

}