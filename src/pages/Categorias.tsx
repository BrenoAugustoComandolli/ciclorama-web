import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoriasScripts from '../scripts/CategoriasScripts';
import '../styles/categorias.css';

export function Categorias() {

  const [nome, setNome] = useState<string>('');

  const navigate = useNavigate();
  useEffect(() => { verificarAutenticacao() }, []);

  return (
    <div id="container-categorias">
      <div id="box-categorias">
        <div className="titulo-alinhado">
          <div className="linhaEsquerda">
            <strong className="titulo-edicao">Categorias</strong>
            <div className="linha"></div>
          </div>
          <div className="linhaDireita">
            <p><Link to="/HomePage" className="voltar">Voltar</Link></p>
            <div className="linha"></div>
          </div>
        </div>
        <div id="dados-categoria">
          <div id="cadastro-categoria">
            <label id="nome-categoria">Nome da categoria:</label>
            <input id="input-categoria" onChange={(texto) => setNome(texto.target.value)} />
          </div>
          <button id='botao-salvar' onClick={() => salvarCategoria()}>Salvar</button>
          <button id='botao-excluir' onClick={() => excluirCategoria()}>Excluir</button>
        </div>
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!CategoriasScripts.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function salvarCategoria() {
    if (nome) {
      const salvou = await CategoriasScripts.salvarCategoria(nome);
      if (salvou) {
        alert("Categoria salva com sucesso!");
      }
    } else {
      alert("Falha ao salvar!");
    }
  }

  async function excluirCategoria() {
    if (nome) {
      const excluiu = await CategoriasScripts.excluirCategoria(nome);
      if (excluiu) {
        alert("Categoria excluída com sucesso!");
      }
    } else {
      alert("Falha ao excluir!");
    }
  }

}