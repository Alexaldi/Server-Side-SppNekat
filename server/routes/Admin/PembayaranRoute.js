import express from "express";
import {
    deletePembayaran,
    getPembayaran,
    getPembayaranByAdmin,
    getPembayaranById,
    getPembayaranByM,
    getPembayaranBySpp,
    getPembayaranWithJoin,
    createPembayaran,
    getPembayaranByStatus
} from "../../controllers/Pembayaran.js";
import { authRoleB } from "../../middleware/RolesB.js";
import { refreshToken2 } from "../../controllers/RefreshToken2.js";
const pembayaranRoutesA = express.Router();

pembayaranRoutesA.get('/pembayaran', authRoleB, getPembayaran);
pembayaranRoutesA.post('/pembayaranA', authRoleB, createPembayaran);
pembayaranRoutesA.get('/pembayaranS', getPembayaranByStatus);
pembayaranRoutesA.get('/pembayaranI/:id_siswa', authRoleB, getPembayaranById);
pembayaranRoutesA.get('/pembayaranM/:id_pembayaran', authRoleB, getPembayaranByM);
pembayaranRoutesA.get('/pembayaranA/:id_petugas', authRoleB, getPembayaranByAdmin);
pembayaranRoutesA.get('/pembayaranJoin', authRoleB, getPembayaranWithJoin);
pembayaranRoutesA.get('/pembayaranSpp/:id_spp', authRoleB, getPembayaranBySpp)
pembayaranRoutesA.delete('/pembayaran/:id_pembayaran', authRoleB, deletePembayaran)
pembayaranRoutesA.get('/tokenA', refreshToken2)
export default pembayaranRoutesA;