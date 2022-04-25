import { Categoria as CategoriaComp } from '../components/Categoria';
import { Filme as FilmeComp } from '../components/Filme';
import { useNavigate } from 'react-router-dom';
import { Categoria } from '../model/Categoria';
import { useEffect, useState } from 'react';
import { Filme } from '../model/Filme';
import { Grid } from '@mui/material';
import HomePageScript from '../scripts/HomePageScript';
import fotoPesquisa from '../assets/lupa.png'
import fotoUsuario from '../assets/user-icon.png';

import '../styles/homePage.css';

export function HomePage() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);
  const [valorPesquisa, setValorPesquisa] = useState<string>('');
  const [imagemUrl, setImagemUrl] = useState<string>();

  const navigate = useNavigate();
  useEffect(() => { carregamentoIncial() }, []);

  function carregamentoIncial() {
    if (verificarAutenticacao()) {
      carregarFotoUsuario();
      carregarTodasCategoriasUsuario();
      carregarTodosFilmesUsuario();
    }
  }

  function atualizarPesquisa(conteudo: string) {
    setValorPesquisa(conteudo);
    buscarFilmesPorListaCategoria(conteudo, categoriasSelecionadas);
  }

  function deslogar() {
    HomePageScript.deslogar();
    sessionStorage.setItem('token-acesso', '');
    navigate("/Login");
  }

  function editarPerfil() {
    navigate("/EditarPerfil");
  }

  function adicionarFilme() {
    navigate("/CadastroFilme");
  }

  function adicionarCategoria() {
    navigate("/Categorias");
  }

  return (
    <div id="container-home">
      <div id="navBarHome">
        <div id="divPesquisa" className="divBar">
          <img id="pesquisa-img" src={fotoPesquisa} alt="Pesquisa" />
          <input id="pesquisar" onChange={(evento) => atualizarPesquisa(evento.target.value)} />
        </div>
        <div id="divFoto" className="divBar">
          {
            !imagemUrl ?
              <img id="foto-perfil" onClick={(evento) => editarPerfil()} src={fotoUsuario} alt="Perfil" />
              :
              <img id="foto-perfil" onClick={(evento) => editarPerfil()} src={imagemUrl} alt="Perfil" />
          }
        </div>
      </div>
      <div id="tituloExibicao">
        <div id="div-titulo-exibe">
          <div className="barra"></div>
          <h1 id="tituloCiclorama" className="titulo">Ciclorama</h1>
        </div>
        <button id="sair" onClick={(evento) => deslogar()}>Sair</button>
      </div>
      <div id="catalogo">
        <div id="filmes-exibe">
          <Grid id="grid-filmes" container columnSpacing={6} rowSpacing={5}>
            {
              filmes.length > 0 ?
                filmes.map(umFilme => {
                  return <FilmeComp key={umFilme.id} id={umFilme.id} nome={umFilme.nome} capaUrl={umFilme.capaUrl} ></FilmeComp>
                })
                : <h1 id="aviso-filme">Nenhum filme encontrado</h1>
            }
          </Grid>
        </div>
        <div id="categorias">
          <h2 id="titulo-categoria" className='titulo'>Categorias</h2>
          <button id="add-categoria" onClick={(evento) => adicionarCategoria()}>+</button>
          <Grid id="grid-categorias" container>
            {
              categorias.length > 0 ?
                categorias.map(umaCategoria => {
                  return <CategoriaComp
                    key={umaCategoria.id}
                    id={umaCategoria.id}
                    nome={umaCategoria.nome}
                    listaSelecionas={categoriasSelecionadas}
                    addSelecionada={(id) => setCategoriasSelecionadas([...categoriasSelecionadas, id])}
                    removerDaSelecao={(id) => setCategoriasSelecionadas(categoriasSelecionadas.filter(x => x != id))}
                    buscarFilmes={(lista) => buscarFilmesPorListaCategoria(valorPesquisa, lista)} />
                })
                : <h3 id="aviso-categoria">Nenhuma</h3>
            }
          </Grid>
        </div>
      </div>
      <div onClick={(evento) => adicionarFilme()} id="adicionarFilme" className='adicionar'>
        <p>+</p>
      </div>
    </div>
  );

  function verificarAutenticacao() {
    if (!HomePageScript.verificarAutenticacao()) {
      navigate("/Login");
      return false;
    }
    return true;
  }

  async function carregarFotoUsuario() {
    try {
      const linkFoto = await HomePageScript.carregarFotoUsuario();
      if (linkFoto) {
        setImagemUrl(linkFoto)
      }
    } catch (err) {
      navigate("/Login");
    }
  }

  async function carregarTodasCategoriasUsuario() {
    try {
      const categorias = await HomePageScript.carregarTodasCategoriasUsuario();
      if (categorias && categorias.length > 0) {
        setCategorias(categorias)
      }
    } catch (err) {
      navigate("/Login");
    }
  }

  async function carregarTodosFilmesUsuario() {
    try {
      const filmes = await HomePageScript.carregarTodosFilmesUsuario();
      setFilmes(filmes);
    } catch (err) {
      navigate("/Login");
    }
  }

  async function buscarFilmesPorListaCategoria(conteudo: string, listaSelecionadas: number[]) {
    try {
      const filmes = await HomePageScript.buscarFilmesPorListaCategoria(conteudo, listaSelecionadas);
      setFilmes(filmes);
    } catch (err) {
      navigate("/Login");
    }
  }

}

