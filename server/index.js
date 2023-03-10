//! Library / NPM
import express from "express";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/Database.js";
//! Admin routes
import routerSiswaA from "./routes/Admin/siswa.js";
import routerPetugasA from "./routes/Admin/petugas.js";
import routerClassA from "./routes/Admin/classroom.js";
import sppRouteA from "./routes/Admin/SppRoutes.js";
import pembayaranRoutesA from "./routes/Admin/PembayaranRoute.js";
//* Users routes
import routerSiswaB from "./routes/Siswa/siswa.js";
import routerClassB from "./routes/Siswa/classroom.js";
import sppRouteB from "./routes/Siswa/SppRoutes.js";
import pembayaranRoutesB from "./routes/Siswa/PembayaranRoute.js";

dotenv.config();
const app = express();

try {
    db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}
app.use(cors({ extended: true, credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
//!Admin
app.use(routerSiswaA);
app.use(routerPetugasA)
app.use(routerClassA)
app.use(sppRouteA)
app.use(pembayaranRoutesA)
//!Siswa
app.use(routerSiswaB)
app.use(routerClassB)
app.use(sppRouteB)
app.use(pembayaranRoutesB)

app.listen(5000, () => console.log('Server running at port 5000'));