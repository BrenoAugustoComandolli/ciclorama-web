import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/cadastroFilme.css';
import CadastroFilmeScript from "../scripts/CadastroFilmeScript";
import { Filme } from '../model/Filme';

export function CadastroFilme() {

  const [filme, setFilme] = useState<Filme>();

  const [nome, setNome] = useState<string>('');
  const [capaUrl, setCapaUrl] = useState<string>('');
  const [sinopse, setSinopse] = useState<string>('');
  const [caminho, setCaminho] = useState<string>('');
  const [trailerUrl, setTrailerUrl] = useState<string>('');

  const navigate = useNavigate();
  const { filmeId } = useParams();

  useEffect(() => { carregamentoIncial() }, []);

  function carregamentoIncial() {
    if (verificarAutenticacao()) {
      if (filmeId) {
        carregarFilme();
      }
    }
  }

  function salvarFilme() {
    if (filmeId) {
      atualizarFilme();
    } else {
      cadastrarFilme();
    }
  }

  function adicionarFilmeCategoria() {
    if(filmeId){
      navigate("/VinculoFilmeCategoria/" + filmeId);
    }
  }

  return (
    <div id="container-adicionarFilme">
      <div id="box-adicionarFilme">
        <div className="titulo-alinhado">
          <div className="linhaEsquerda">
            <strong id="titulo-edicao-filme" className="titulo-edicao">Adicionar Filme</strong>
            <div className="linha" />
          </div>
          <div className="linhaDireita">
            <p><Link to="/HomePage" className="voltar">Home</Link></p>
            <div className="linha"></div>
          </div>
        </div>
        <div id="centro-cadastro-filme">
          <div id="align-centro-cadastro-filme">
            <div className="campos-input-filme">
              <label className="nome-campos-filme">Nome do filme:</label>
              <input className="input-adicionar-filme dados-filme-input" value={nome}
                onChange={(texto) => setNome(texto.target.value)} />
            </div>
            <div className="campos-input-filme">
              <label className="nome-campos-filme">Link do trailer:</label>
              <input className="input-adicionar-filme dados-filme-input" value={trailerUrl}
                onChange={(texto) => setTrailerUrl(texto.target.value)} />
            </div>
            <div className="campos-input-filme">
              <label className="nome-campos-filme">Repositório do filme:</label>
              <input className="input-adicionar-filme dados-filme-input" value={caminho}
                onChange={(texto) => setCaminho(texto.target.value)} />
            </div>
            <div className="campos-input-filme">
              <label className="nome-campos-filme">Imagem do filme:</label>
              <input className="input-adicionar-filme dados-filme-input" value={capaUrl}
                onChange={(texto) => setCapaUrl(texto.target.value)} />
            </div>
            <div className="campos-input-filme">
              <label className="nome-campos-filme">Descrição do filme:</label>
              <textarea id="descricao-filme" className="input-adicionar-filme" value={sinopse}
                placeholder="Comente sobre o filme aqui..."
                onChange={(texto) => setSinopse(texto.target.value)}></textarea>
            </div>
            <button id='botao-salvar-filme' onClick={() => salvarFilme()}>Salvar</button>
            {
              filmeId ?
                <button id='botao-excluir-filme' onClick={() => deletarFilme()}>Excluir filme</button>
                : <></>
            }
          </div>
        </div>
        {
          filmeId ?
            <div onClick={(evento) => adicionarFilmeCategoria()} id="adicionarFilmeCategoria" className='adicionar'>
              <p>+</p>
            </div>
          : <></>
        }
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!CadastroFilmeScript.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function carregarFilme() {
    if (filmeId) {
      try {
        const filme = await CadastroFilmeScript.carregarFilme(parseInt(filmeId));
        if (filme) {
          setFilme(filme)
          setNome(filme.nome);
          setCapaUrl(filme.capaUrl);
          setSinopse(filme.sinopse);
          setTrailerUrl(filme.trailerUrl);
          setCaminho(filme.caminho);
        }
      } catch (err) {
        navigate("/HomePage");
      }
    }
  }

  async function atualizarFilme() {
    if (mudouInformacoes() && filmeId) {
      const atualizou = await CadastroFilmeScript.atualizarFilme(parseInt(filmeId), nome, capaUrl, sinopse, trailerUrl, caminho);
      atualizaValoresFilmeForm();
      if (atualizou) {
        alert("Alterações salvas com sucesso!");
      }
    } else {
      alert("Nenhum dado alterado!")
    }
  }

  function atualizaValoresFilmeForm() {
    if (filme) {
      filme.nome = nome;
      filme.capaUrl = capaUrl;
      filme.sinopse = sinopse;
      filme.trailerUrl = trailerUrl;
      filme.caminho = caminho;
    }
  }

  async function cadastrarFilme() {
    const salvou = await CadastroFilmeScript.cadastrarFilme(nome, capaUrl, sinopse, trailerUrl, caminho);
    if (salvou) {
      alert("Filme salvo com sucesso!");
      navigate("/HomePage");
    }
  }

  async function deletarFilme() {
    const resposta = window.confirm("Deseja mesmo excluir o filme?");
    if (resposta && filmeId) {
      const excluiu = await CadastroFilmeScript.excluirFilme(parseInt(filmeId));
      if (excluiu) {
        navigate("/HomePage");
      }
    }
  }

  function mudouInformacoes() {
    if (filme) {
      if (nome == filme.nome && capaUrl == filme.capaUrl &&
        sinopse == filme.sinopse && trailerUrl == filme.trailerUrl &&
        caminho == filme.caminho) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

}