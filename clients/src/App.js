import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
// Siswa Page
import ListSiswa from "./pages/list/siswa/List"
import { SingleSiswa } from './pages/single/siswa/Single';
import NewSiswa from './pages/new/siswa/newSiswa';
import EditSiswa from "./pages/Edit/siswa/editSiswa"
// Admin Page
import ListAdmin from './pages/list/admin/List';
import { SingleAdmin } from './pages/single/admin/Single';
import NewAdmin from './pages/new/admin/newAdmin';
import EditAdmin from './pages/Edit/admin/editAdmin';
//Kelas Page
import ListKelas from './pages/list/kelas/List';
import { SingleKelas } from './pages/single/kelas/Single';
import NewKelas from './pages/new/kelas/newKelas';
import EditKelas from './pages/Edit/kelas/editKelas';
//Spp page
import ListSpp from './pages/list/spp/List'
import './styles/styles.scss';
import { SingleSpp } from './pages/single/spp/Single';
import NewSpp from './pages/new/spp/newSpp';
import EditSpp from './pages/Edit/spp/editSpp';
//pembayaran
import ListPembayaran from './pages/list/pembayaran/List'
import NewPembayaran from './pages/new/pembayaran/newPembayaran';
import { AppProvider, AppContext } from "./store/index"
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
function Main({ accessToken, Petugas }) {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    if (accessToken && Petugas) {
      const DataPetugas = JSON.parse(atob(Petugas))
      dispatch({ type: "SET_TOKEN", payload: accessToken })
      dispatch({ type: "SET_PETUGAS", payload: DataPetugas })
    }
  }, [accessToken, Petugas]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* siswa */}
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ListSiswa />} />
          <Route path="/users/new" element={<NewSiswa />} />
          <Route path="/users/edit/:userId" element={<EditSiswa />} />
          <Route path="/users/:userId" element={<SingleSiswa />} />
          {/* admin */}
          <Route path="/admin" element={<ListAdmin />} />
          <Route path="/admin/:adminId" element={<SingleAdmin />} />
          <Route path="/admin/new" element={<NewAdmin />} />
          <Route path="/admin/edit/:adminId" element={<EditAdmin />} />
          {/* Kelas*/}
          <Route path="/kelas" element={<ListKelas />} />
          <Route path="/kelas/:kelasId" element={<SingleKelas />} />
          <Route path="/kelas/new" element={<NewKelas />} />
          <Route path="/kelas/edit/:kelasId" element={<EditKelas />} />
          {/* Spp*/}
          <Route path="/spp" element={<ListSpp />} /> z
          <Route path="/spp/:sppId" element={<SingleSpp />} />
          <Route path="/spp/new" element={<NewSpp />} />
          <Route path="/spp/edit/:sppId" element={<EditSpp />} />
          {/*pembayaran*/}
          <Route path="/pembayaran" element={<ListPembayaran />} />
          <Route path="/pembayaran/new" element={<NewPembayaran />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [petugas, setPetugas] = useState([]);

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
    const rawPetugas = Cookies.get("Petugas")
    setPetugas(rawPetugas)
  }, []);

  return (
    <AppProvider>
      <Main accessToken={accessToken} Petugas={petugas} />
    </AppProvider>
  );
}

export default App;