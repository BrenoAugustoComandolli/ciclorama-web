import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { CadastradoSucesso } from './pages/CadastradoSucesso';
import { HomePage } from './pages/HomePage';
import { Categorias } from './pages/Categorias';
import { EditarPerfil } from './pages/EditarPerfil';
import { CadastroFilme } from './pages/CadastroFilme';
import { ExibicaoFilme } from './pages/ExibicaoFilme';
import { VinculoFilmeCategoria } from './pages/VinculoFilmeCategoria';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Cadastro' element={<Cadastro />} />
        <Route path='/CadastradoSucesso' element={<CadastradoSucesso />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/Categorias' element={<Categorias />} />
        <Route path='/EditarPerfil' element={<EditarPerfil />} />
        <Route path='/ExibicaoFilme/:filmeId' element={<ExibicaoFilme />} />
        <Route path='/CadastroFilme' element={<CadastroFilme />} />
        <Route path='/CadastroFilme/:filmeId' element={<CadastroFilme />} />
        <Route path='/VinculoFilmeCategoria/:filmeId' element={<VinculoFilmeCategoria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;