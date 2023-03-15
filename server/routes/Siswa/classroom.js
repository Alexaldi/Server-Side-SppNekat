import express from "express";
import {
    getClassRooms,
    getClassRoomById,
} from "../../controllers/ClassRoom.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";

const routerClassB = express.Router();

routerClassB.get('/class', verifyToken, getClassRooms);
routerClassB.get('/class/:id_kelas', verifyToken, getClassRoomById);
routerClassB.get('/token', refreshToken);
export default routerClassB;