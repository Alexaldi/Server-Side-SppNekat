import express from "express";
import { getUsers, Register, Login, Logout } from "../../controllers/Siswa.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { refreshToken } from "../../controllers/RefreshToken.js";


const routerSiswaB = express.Router();

routerSiswaB.get('/users', verifyToken, getUsers);
routerSiswaB.post('/users', Register);
routerSiswaB.post('/login', Login);
routerSiswaB.get('/refresh', refreshToken);
routerSiswaB.delete('/logout', Logout);

// routerSiswaB.get('/search', verifyToken, search)
export default routerSiswaB;