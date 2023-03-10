import Siswa from "../models/SiswaModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
        if (!refreshToken) return res.sendStatus(401);
        const siswa = await Siswa.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!siswa[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const id_siswa = siswa[0].id_siswa
            const nisn = siswa[0].nisn
            const nama = siswa[0].nama
            const id_kelas = siswa[0].id_kelas
            const alamat = siswa[0].alamat
            const no_telp = siswa[0].no_telp
            const email = siswa[0].email
            const accessToken = jwt.sign({ id_siswa, nisn, nama, id_kelas, alamat, no_telp, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}