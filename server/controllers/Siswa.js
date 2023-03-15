import Siswa from "../models/SiswaModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ClassRoom from "../models/ClassRoom.js";

export const getUsers = async (req, res) => {
    try {
        const siswa = await Siswa.findAll({
            attributes: ['id_siswa', 'nisn', 'name', 'alamat', 'no_telp', 'email'],
            include: {
                model: ClassRoom,
                as: 'kelas',
                attributes: ['angkatan', 'kelas']
            }
        });
        res.json(siswa);
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getUsersById = async (req, res) => {
    try {
        const siswa = await Siswa.findOne({
            attributes: ['id_siswa', 'nisn', 'name', 'id_kelas', 'alamat', 'no_telp', 'email'],
            where: { id_siswa: req.params.id_siswa },
            include: { model: ClassRoom, as: 'kelas', attributes: ['angkatan', 'kelas'] }
        });

        res.json(siswa);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUsersByKelas = async (req, res) => {
    try {
        const siswa = await Siswa.findAll({
            attributes: ['id_siswa', 'nisn', 'name', 'id_kelas', 'alamat', 'no_telp', 'email'],
            where: { id_kelas: req.params.id_kelas },
            include: { model: ClassRoom, as: 'kelas', attributes: ['angkatan', 'kelas'] },
            order: [['name', 'ASC']]
        });

        res.json(siswa);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const Register = async (req, res) => {
    const { nisn, nama, id_kelas, alamat, no_telp, email, password, confPassword } = req.body;
    console.log(nisn);
    const siswa = await Siswa.findAll({
        where: {
            nisn
        }
    });
    if (siswa[0]) return res.status(400).json({ msg: "Anda Sudah Mempunyai Akun" })
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Siswa.create({
            nisn: nisn,
            name: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const EditSiswa = async (req, res) => {
    const { nisn, nama, id_kelas, alamat, no_telp, email, password, confPassword } = req.body;
    const { id_siswa } = req.params;
    const siswa = await Siswa.findOne({
        where: {
            id_siswa
        }
    });
    if (nisn && nisn !== siswa.nisn) {
        const existingSiswa = await Siswa.findOne({ where: { nisn } });
        if (existingSiswa) {
            return res.status(400).json({ msg: "Nisn Telah Digunakan" });
        }
    }
    if (password && password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = password ? await bcrypt.hash(password, salt) : siswa.password;
    console.log(req.body);
    try {
        await Siswa.update({
            nisn: nisn,
            name: nama,
            id_kelas: id_kelas,
            alamat: alamat,
            no_telp: no_telp,
            email: email,
            password: hashPassword
        }, {
            where: {
                id_siswa
            }
        });
        res.json({ msg: "Edit Siswa Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    console.log(req.body.nisn);
    console.log(req.body.password);
    try {
        const siswa = await Siswa.findAll({
            where: {
                nisn: req.body.nisn
            }
        });
        const match = await bcrypt.compare(req.body.password, siswa[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const id_siswa = siswa[0].id_siswa
        const nisn = siswa[0].nisn
        const nama = siswa[0].name
        const id_kelas = siswa[0].id_kelas
        const alamat = siswa[0].alamat
        const no_telp = siswa[0].no_telp
        const email = siswa[0].email
        const accessToken = jwt.sign({ id_siswa, nisn, nama, id_kelas, alamat, no_telp, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        await Siswa.update({ refresh_token: accessToken }, {
            where: {
                id_siswa: id_siswa
            }
        });
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "nisn tidak ditemukan" });
    }
}

export const deleteSiswa = async (req, res) => {
    console.log(req.params.id_siswa);
    try {
        await Siswa.destroy({
            where: {
                id_siswa: req.params.id_siswa
            }
        });
        res.json({
            "message": "Siwa Telah Di Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const siswa = await Siswa.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!siswa[0]) return res.sendStatus(204);
    const id_siswa = siswa[0].id_siswa
    await Siswa.update({ refresh_token: null }, {
        where: {
            id_siswa: id_siswa
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}