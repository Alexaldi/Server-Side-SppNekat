import express from "express";
import { getPetugas, Register, Login, Logout, EditPetugas, getUPetugasById, deletePetugas, getUPetugasByUsername } from "../../controllers/Petugas.js";
import { refreshToken2 } from "../../controllers/RefreshToken2.js";
import { authRoleB } from "../../middleware/RolesB.js";
import { authRoleA } from "../../middleware/RolesA.js";

const routerPetugasA = express.Router();

routerPetugasA.get('/admin', authRoleB, getPetugas);
routerPetugasA.post('/admin', authRoleA, Register);
routerPetugasA.patch('/admin/:id_petugas', EditPetugas);
routerPetugasA.get('/admin/:id_petugas', authRoleB, getUPetugasById);
routerPetugasA.delete('/admin/:id_petugas', authRoleB, deletePetugas);
routerPetugasA.get('/adminU/:username', authRoleB, getUPetugasByUsername);
routerPetugasA.post('/loginAdmin', Login);
routerPetugasA.delete('/logoutAdmin', Logout);
routerPetugasA.get('/tokenA', refreshToken2)
export default routerPetugasA;