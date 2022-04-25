import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CadastroUsuarioScript from '../scripts/CadastroUsuarioScript';

import '../styles/cadastro.css';

export function Cadastro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  async function cadastrar() {
    if (await CadastroUsuarioScript.cadastrar(nome, email, senha)) {
      navigate("/CadastradoSucesso");
    }
  }

  return (
    <div id="container-cadastro">
      <div id="box-cadastre-se">
        <strong id="titulo-cadastro" className="titulo">Ciclorama</strong>
        <input id="usuario" onChange={(texto) => setNome(texto.target.value)} type="text" placeholder="Nome de usuário" />
        <input id="email" onChange={(texto) => setEmail(texto.target.value)} type="email" placeholder="E-mail" />
        <input id="senha" onChange={(texto) => setSenha(texto.target.value)} type="password" placeholder="Senha" />
        <button id="botao-cadastre-se" onClick={() => cadastrar()}>Cadastrar-se</button>
        <p>Já tem uma conta? <Link to="/Login" id="entre">Entre</Link></p>
      </div>
    </div>
  );

}