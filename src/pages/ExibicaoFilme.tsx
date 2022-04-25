import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filme } from '../model/Filme';
import ExibicaoFilmeScript from '../scripts/ExibicaoFilmeScript';

import '../styles/exibicaoFilme.css';

export function ExibicaoFilme() {

  const [filme, setFilme] = useState<Filme>();

  const navigate = useNavigate();
  const { filmeId } = useParams();
  useEffect(() => { carregamentoIncial() }, []);

  function carregamentoIncial() {
    if (verificarAutenticacao()) {
      carregarFilme();
    }
  }

  function editar() {
    navigate("/CadastroFilme/" + filmeId);
  }

  function abrirFilme() {
    if (filme?.caminho) {
      window.location.href = filme?.caminho;
    }
  }

  return (
    <div id='container-exibicao'>
      <div id="cabecalho">
        <div id="titulo-barra">
          <div id="linha-vertical" />
          <strong id="nome-filme">{filme?.nome}</strong>
        </div>
      </div>
      <div id='trailer-filme'>
        {
          filme?.trailerUrl ?
            <iframe id="trailer" src={filme?.trailerUrl + "?autoplay=1"}
            title="Trailer do filme" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          : <></>
        }
       
      </div>
      <div id='descricao-filme'>
        <p id="descricao-texto">{filme?.sinopse}</p>
      </div>
      <div id="acoes-filmes">
        <button id='botao-editar-filme' onClick={() => editar()}>Editar</button>
        <button id='botao-abrir-filme' onClick={() => abrirFilme()}>Reproduzir</button>
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!ExibicaoFilmeScript.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function carregarFilme() {
    if (filmeId && !filme) {
      try {
        const filme = await ExibicaoFilmeScript.carregarFilme(parseInt(filmeId));
        if (filme) {
          setFilme(filme)
        }
      } catch (err) {
        alert("Não foi possível recuperar nenhum filme");
        navigate("/HomePage");
      }
    } else {
      alert("Não foi possível recuperar nenhum filme");
      navigate("/HomePage");
    }
  }

}