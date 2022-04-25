export interface CategoriaComp {
    id: number,
    nome: string,
    listaSelecionas: number[],
    addSelecionada: (id: number) => void,
    removerDaSelecao: (id: number) => void,
    buscarFilmes: (listaSelecionas: number[]) => void
}