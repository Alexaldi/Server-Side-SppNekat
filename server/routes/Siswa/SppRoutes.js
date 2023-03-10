import express from "express";
import {
    getSpp,
    getSppById,
    createSpp,
} from "../../controllers/Spp.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";
const sppRouteB = express.Router();

sppRouteB.get('/spp', verifyToken, getSpp);
sppRouteB.get('/spp/:id_spp', verifyToken, getSppById);
sppRouteB.post('/spp', verifyToken, createSpp);
sppRouteB.get('/token', refreshToken);

export default sppRouteB;