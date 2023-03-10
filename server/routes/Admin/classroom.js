import express from "express";
import {
    getClassRooms,
    getClassRoomById,
    saveClassRoom,
    updateClassRoom,
    deleteClassRoom
} from "../../controllers/ClassRoom.js";
import { authRoleB } from "../../middleware/RolesB.js";
import { authRoleA } from "../../middleware/RolesA.js";
import { refreshToken2 } from "../../controllers/RefreshToken2.js";

const routerClassA = express.Router();

routerClassA.get('/kelas', authRoleB, getClassRooms);
routerClassA.get('/kelas/:id_kelas', authRoleB, getClassRoomById);
routerClassA.post('/kelas', authRoleA, saveClassRoom);
routerClassA.patch('/kelas/:id_kelas', authRoleA, updateClassRoom);
routerClassA.delete('/kelas/:id_kelas', authRoleA, deleteClassRoom);

export default routerClassA;