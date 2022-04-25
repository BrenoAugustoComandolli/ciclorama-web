import { FilmeComp } from '../model/componentes/FilmeComp';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import '../styles/stylesComps/filmeComp.css';

export function Filme(props: FilmeComp) {

    const navigate = useNavigate();

    function abrirFilme(filmeId: number) {
        navigate("/ExibicaoFilme/" + filmeId);
    }

    return (
        <Grid item>
            <div id="container-filme" onClick={(evento) => abrirFilme(props.id)}>
                <div className="filme">
                    <img id="imagem-filme" src={props.capaUrl} alt="Filme" />
                </div>
                <h5 id="titulo-filme">{props.nome}</h5>
            </div>
        </Grid>
    );

}