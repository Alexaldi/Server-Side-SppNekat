import express from "express";
import { getUsers, getUsersById, deleteSiswa, Register, EditSiswa, getUsersByKelas } from "../../controllers/Siswa.js";
import { authRoleA } from "../../middleware/RolesA.js";
import { authRoleB } from "../../middleware/RolesB.js";

const routerSiswaA = express.Router();
routerSiswaA.get('/usersa', authRoleB, getUsers);
routerSiswaA.post('/usersa', authRoleA, Register);
routerSiswaA.patch('/usersa/:id_siswa', authRoleA, EditSiswa);
routerSiswaA.get('/usersClass/:id_kelas', authRoleB, getUsersByKelas);
routerSiswaA.get('/usersa/:id_siswa', authRoleB, getUsersById);
routerSiswaA.delete('/usersa/:id_siswa', authRoleB, deleteSiswa);
export default routerSiswaA;