import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VinculoFilmeCategoriaScript from "../scripts/VinculoFilmeCategoriaScript";

import '../styles/vinculoFilmeCategoria.css';

export function VinculoFilmeCategoria() {

  const [nome, setNome] = useState<string>('');
  
  const { filmeId } = useParams();
  const navigate = useNavigate();
  useEffect(() => { verificarAutenticacao() }, []);

  return (
    <div id="container-filme-categorias">
      <div id="box-filme-categorias">
        <div className="titulo-alinhado">
          <div className="linhaEsquerda">
            <strong className="titulo-edicao">Vinculos</strong>
            <div className="linha"></div>
          </div>
          <div className="linhaDireita">
            <p><Link to="/HomePage" className="voltar">Home</Link></p>
            <div className="linha"></div>
          </div>
        </div>
        <div id="dados-filme-categorias">
          <div id="cadastro-filme-categorias">
            <label id="nome-filme-categorias">Nome da categoria:</label>
            <input id="input-filme-categorias" onChange={(texto) => setNome(texto.target.value)} />
          </div>
          <button id='botao-salvar' onClick={() => salvarFilmeCategoria()}>Salvar</button>
          <button id='botao-excluir' onClick={() => excluirFilmeCategoria()}>Excluir</button>
        </div>
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!VinculoFilmeCategoriaScript.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function salvarFilmeCategoria() {
    if (nome && filmeId) {
      const salvou = await VinculoFilmeCategoriaScript.salvarFilmeCategoria(parseInt(filmeId), nome);
      if (salvou) {
        alert("Categoria vinculada com sucesso!");
      }
    } else {
      alert("Falha ao salvar!");
    }
  }

  async function excluirFilmeCategoria() {
    if (nome && filmeId) {
      const excluiu = await VinculoFilmeCategoriaScript.excluirFilmeCategoria(parseInt(filmeId), nome);
      if (excluiu) {
        alert("Categoria desvinculada com sucesso!");
      }
    } else {
      alert("Falha ao excluir!");
    }
  }

}