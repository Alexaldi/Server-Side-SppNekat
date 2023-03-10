import express from "express";
import {
    getPembayaran,
    getPembayaranById,
    createPembayaran,
} from "../../controllers/Pembayaran.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";
const pembayaranRoutesB = express.Router();

pembayaranRoutesB.get('/pembayaran', verifyToken, getPembayaran);
pembayaranRoutesB.get('/pembayaran/:id_pembayaran', verifyToken, getPembayaranById);
pembayaranRoutesB.post('/pembayaran', verifyToken, createPembayaran);
pembayaranRoutesB.get('/token', refreshToken);
export default pembayaranRoutesB;