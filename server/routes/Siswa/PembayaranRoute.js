import express from "express";
import {
    getPembayaran,
    getPembayaranById,
    createPembayaran,
} from "../../controllers/Pembayaran.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";
const pembayaranRoutesB = express.Router();

pembayaranRoutesB.get('/pembayaranU', verifyToken, getPembayaran);
pembayaranRoutesB.get('/pembayaranU/:id_siswa', verifyToken, getPembayaranById);
pembayaranRoutesB.post('/pembayaran', verifyToken, createPembayaran);
pembayaranRoutesB.get('/token', refreshToken);
export default pembayaranRoutesB;