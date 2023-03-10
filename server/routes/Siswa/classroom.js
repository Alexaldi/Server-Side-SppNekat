import express from "express";
import {
    getClassRooms,
    getClassRoomById,
} from "../../controllers/ClassRoom.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";

const routerClassB = express.Router();

routerClassB.get('/products', verifyToken, getClassRooms);
routerClassB.get('/products/:id_kelas', verifyToken, getClassRoomById);
routerClassB.get('/token', refreshToken);
export default routerClassB;