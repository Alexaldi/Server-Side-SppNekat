import express from "express";
import {
    getSpp,
    getSppById,
    createSpp,
    deleteSpp,
    updateSpp,
} from "../../controllers/Spp.js";
import { authRoleA } from "../../middleware/RolesA.js";
import { authRoleB } from "../../middleware/RolesB.js";
import { refreshToken2 } from "../../controllers/RefreshToken2.js";
const sppRouteA = express.Router();

sppRouteA.get('/spp', authRoleB, getSpp);
sppRouteA.get('/spp/:id_spp', authRoleB, getSppById);
sppRouteA.post('/spp', authRoleA, createSpp);
sppRouteA.delete('/spp/:id_spp', authRoleA, deleteSpp);
sppRouteA.patch('/spp/:id_spp', authRoleA, updateSpp);
export default sppRouteA;