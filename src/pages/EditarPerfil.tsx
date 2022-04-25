import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../model/Usuario';
import EditarPerfilScript from "../scripts/EditarPerfilScript";
import fotoUsuario from '../assets/user-icon.png';
import HomePageScript from '../scripts/HomePageScript';

import '../styles/editarPerfil.css';

export function EditarPerfil() {

  const [usuario, setUsuario] = useState<Usuario>();

  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [imagemUrl, setImagemUrl] = useState<string>('');

  const navigate = useNavigate();
  useEffect(() => { carregamentoIncial() }, []);

  function carregamentoIncial() {
    if (verificarAutenticacao()) {
      carregarDadosUsuario();
    }
  }

  return (
    <div id="container-editarPerfil">
      <div id="box-editarPerfil">
        <div className="titulo-alinhado">
          <div className="linhaEsquerda">
            <strong className="titulo-edicao">Editar Perfil</strong>
            <div className="linha"></div>
            <label id="info-editar-perfil">Informações</label>
          </div>
          <div className="linhaDireita">
            <p><Link to="/HomePage" className="voltar">Voltar</Link></p>
            <div className="linha"></div>
          </div>
        </div>
        <div id="detalhes-centro">
          <div id="campos-foto">
            {
              !usuario?.imagemUrl ?
                <img id="imagemPerfil" src={fotoUsuario} alt="Foto Perfil" />
                :
                <img id="imagemPerfil" src={usuario.imagemUrl} alt="Foto Perfil" />
            }
            <div id="escolha-arquivo">
              <label htmlFor="botao-escolher-foto">Imagem:</label>
              <input type="text" name="arquivo-foto" id="botao-escolher-foto" value={imagemUrl} onChange={(texto) => setImagemUrl(texto.target.value)}></input>
            </div>
          </div>
          <div id="todos-campos-alinhados">
            <div className="campos-alinhados">
              <label className="nome-campos">Nome de usuário</label>
              <input className="input-editar" value={nome} id="input-usuario" onChange={(texto) => setNome(texto.target.value)} />
            </div>
            <div className="campos-alinhados">
              <label className="nome-campos">E-mail</label>
              <input className="input-editar" value={email} id="input-email" onChange={(texto) => setEmail(texto.target.value)} />
            </div>
            <div className="campos-alinhados">
              <label className="nome-campos">Senha</label>
              <input type="password" className="input-editar" id="input-senha" onChange={(texto) => setSenha(texto.target.value)} />
            </div>
            <button id='botao-salvar' onClick={() => atualizarUsuario()}>Salvar</button>
            <button id='botao-excluir' onClick={() => excluirUsuario()}>Excluir Conta</button>
          </div>
        </div>
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!EditarPerfilScript.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function carregarDadosUsuario() {
    try {
      const usuario = await EditarPerfilScript.carregarDadosUsuario();
      if (usuario) {
        setUsuario(usuario)
        setNome(usuario.nome);
        setEmail(usuario.email);
        setImagemUrl(usuario.imagemUrl);
      }
    } catch (err) {
      navigate("/Login");
    }
  }

  async function excluirUsuario() {
    const resposta = window.confirm("Deseja mesmo excluir o usuário?");
    if (resposta) {
      const excluiu = await EditarPerfilScript.excluirUsuario();
      if (excluiu) {
        navigate("/Login");
      }
    }
  }

  function mudouInformacoes() {
    if (usuario) {
      if (nome == usuario.nome && email == usuario.email && imagemUrl == usuario.imagemUrl && !senha) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  async function atualizarUsuario() {
    if (mudouInformacoes()) {
      const atualizou = await EditarPerfilScript.atualizarUsuario(nome, email, senha, imagemUrl);
      atualizaValoresUsuarioForm();
      if (atualizou) {
        alert("Alterações salvas com sucesso!");
      }
      deslogar();
    } else {
      alert("Nenhum dado alterado!")
    }
  }

  function atualizaValoresUsuarioForm() {
    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.imagemUrl = imagemUrl;
      usuario.senha = usuario.senha;
    }
  }

  function deslogar() {
    HomePageScript.deslogar();
    sessionStorage.setItem('token-acesso', '');
    navigate("/Login");
  }

}