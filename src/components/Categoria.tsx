import { CategoriaComp } from '../model/componentes/CategoriaComp';
import { Grid } from '@mui/material';
import { useState } from 'react';

import '../styles/stylesComps/categoriaComp.css';

export function Categoria(props: CategoriaComp) {

    const [selecionado, setSelecionado] = useState(false);

    function alteraSelecaoCategoria() {
        setSelecionado(!selecionado);
        if (!selecionado) {
            props.addSelecionada(props.id);
            props.buscarFilmes([...props.listaSelecionas, props.id]);
        } else {
            props.removerDaSelecao(props.id);
            props.buscarFilmes(props.listaSelecionas.filter(x => x != props.id));
        }
    }

    return (
        <Grid item onClick={(evento) => alteraSelecaoCategoria()}>
            {
                selecionado ?
                    <div className="categoria-selecionada">{props.nome}</div>
                    : <div className="categoria">{props.nome}</div>
            }
        </Grid>
    );

}