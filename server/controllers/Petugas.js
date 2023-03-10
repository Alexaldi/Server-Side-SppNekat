import Petugas from "../models/Petugas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getPetugas = async (req, res) => {
    try {
        const petugas = await Petugas.findAll(
            {
                where: {
                    level: "petugas"
                },
                attributes: ['id_petugas', 'username', 'nama_petugas', 'level']
            });
        res.json(petugas);
    } catch (error) {
        console.log(error);
    }
}

export const getUPetugasById = async (req, res) => {
    try {
        const siswa = await Petugas.findOne({
            attributes: ['id_petugas', 'username', 'nama_petugas', 'level'],
            where: { id_petugas: req.params.id_petugas }
        });

        res.json(siswa);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUPetugasByUsername = async (req, res) => {
    try {
        const siswa = await Petugas.findOne({
            attributes: ['id_petugas', 'username', 'nama_petugas', 'level'],
            where: { username: req.params.username }
        });
        res.json(siswa);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const Register = async (req, res) => {
    const { username, password, confPassword, nama_petugas, level } = req.body;
    const petugas = await Petugas.findAll({
        where: {
            username
        }
    });
    if (petugas[0]) return res.status(400).json({ msg: "Anda Sudah Mempunyai Akun" })
    console.log(req.body);
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Petugas.create({
            username,
            password: hashPassword,
            nama_petugas,
            level
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const EditPetugas = async (req, res) => {
    const { username, password, nama_petugas, level, confPassword } = req.body;
    const { id_petugas } = req.params;
    const petugas = await Petugas.findOne({
        where: {
            id_petugas
        }
    });
    if (username && username !== petugas.username) {
        const existingPetugas = await Petugas.findOne({ where: { username } });
        if (existingPetugas) {
            return res.status(400).json({ msg: "Username Telah Digunakan" });
        }
    }
    if (password && password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = password ? await bcrypt.hash(password, salt) : petugas.password;
    try {
        await Petugas.update({
            username: username,
            password: hashPassword,
            nama_petugas: nama_petugas,
            level: level
        }, {
            where: {
                id_petugas
            }
        });
        res.json({ msg: "Edit Petugas Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const petugas = await Petugas.findAll({
            where: {
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, petugas[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const id_petugas = petugas[0].id_petugas
        const username = petugas[0].username
        const nama_petugas = petugas[0].nama_petugas
        const level = petugas[0].level
        const accessToken = jwt.sign({ id_petugas, username, nama_petugas, level }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        await Petugas.update({ refresh_token: accessToken }, {
            where: {
                id_petugas: id_petugas
            }
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 604800000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "username tidak ditemukan" });
    }
}

export const deletePetugas = async (req, res) => {
    try {
        await Petugas.destroy({
            where: {
                id_petugas: req.params.id_petugas
            }
        });
        res.json({
            "message": "Petugas Telah Di Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const Logout = async (req, res) => {
    const accessToken = req.query.accessToken;
    console.group("auth")
    console.log(accessToken);
    if (!accessToken) return res.sendStatus(204);
    const petugas = await Petugas.findAll({
        where: {
            refresh_token: accessToken
        }
    });
    console.log(petugas);
    console.groupEnd()
    // if (!petugas[0]) return res.sendStatus(204);
    // const id_petugas = petugas[0].id_petugas
    // await Petugas.update({ refresh_token: null }, {
    //     where: {
    //         id_petugas: id_petugas
    //     }
    // });
    return res.sendStatus(200);
}