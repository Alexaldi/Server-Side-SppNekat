import Pembayaran from "../models/Pembayaran.js";
import Petugas from "../models/Petugas.js";
import Siswa from "../models/SiswaModel.js"
import ClassRoom from "../models/ClassRoom.js";
import Spp from "../models/SppModel.js";
export const getPembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll();
        res.json(pembayaran);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranById = async (req, res) => {
    try {
        const { limit, orderBy } = req.query;
        const order = orderBy.toUpperCase()
        const response = await Pembayaran.findAll({
            where: {
                id_siswa: req.params.id_siswa
            },
            attributes: [
                'id_pembayaran',
                'id_petugas',
                'tgl_bayar',
                'id_spp',
                'jumlah_bayar',
                'keterangan',
                'status'
            ],
            include: [
                {
                    model: Siswa,
                    attributes: ['name', 'nisn'],
                    include: {
                        model: ClassRoom,
                        as: 'kelas',
                        attributes: ['angkatan', 'kelas'],
                    },
                },
                {
                    model: Petugas,
                    as: 'petugas',
                    attributes: ['nama_petugas']
                },
                {
                    model: Spp,
                    as: 'spp',
                    attributes: ['nominal', 'tahun']
                },

            ],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranByM = async (req, res) => {
    try {
        const response = await Pembayaran.findOne({
            where: {
                id_pembayaran: req.params.id_pembayaran
            },
            attributes: [
                'id_pembayaran',
                'id_petugas',
                'tgl_bayar',
                'id_spp',
                'jumlah_bayar',
                'keterangan',
                'status'
            ],
            include: [
                {
                    model: Siswa,
                    attributes: ['name', 'nisn'],
                    include: {
                        model: ClassRoom,
                        as: 'kelas',
                        attributes: ['angkatan', 'kelas'],
                    },
                },
                {
                    model: Petugas,
                    as: 'petugas',
                    attributes: ['nama_petugas']
                },
                {
                    model: Spp,
                    as: 'spp',
                    attributes: ['nominal', 'tahun']
                },

            ],
        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranByAdmin = async (req, res) => {
    try {
        const { limit, orderBy } = req.query;
        const order = orderBy.toUpperCase()
        const response = await Pembayaran.findAll({
            where: {
                id_petugas: req.params.id_petugas
            },
            attributes: [
                'id_pembayaran',
                'id_petugas',
                'tgl_bayar',
                'id_spp',
                'jumlah_bayar',
                'keterangan',
                'status'
            ],
            include: [
                {
                    model: Siswa,
                    attributes: ['name', 'nisn'],
                    include: {
                        model: ClassRoom,
                        as: 'kelas',
                        attributes: ['angkatan', 'kelas'],
                    },
                },
                {
                    model: Petugas,
                    as: 'petugas',
                    attributes: ['nama_petugas']
                },
                {
                    model: Spp,
                    as: 'spp',
                    attributes: ['nominal', 'tahun']
                },

            ],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranBySpp = async (req, res) => {
    try {
        const { limit, orderBy } = req.query;
        const order = orderBy.toUpperCase()
        const response = await Pembayaran.findAll({
            where: {
                id_spp: req.params.id_spp
            },
            attributes: [
                'id_pembayaran',
                'id_petugas',
                'tgl_bayar',
                'id_spp',
                'jumlah_bayar',
                'keterangan',
                'status'
            ],
            include: [
                {
                    model: Siswa,
                    attributes: ['name', 'nisn'],
                    include: {
                        model: ClassRoom,
                        as: 'kelas',
                        attributes: ['angkatan', 'kelas'],
                    },
                },
                {
                    model: Petugas,
                    as: 'petugas',
                    attributes: ['nama_petugas']
                },
                {
                    model: Spp,
                    as: 'spp',
                    attributes: ['nominal', 'tahun']
                },

            ],
            limit: parseInt(limit),
            order: [['id_pembayaran', order]]
        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranByStatus = async (req, res) => {
    try {
        const { id_spp, id_siswa } = req.query;
        const total_bayar = await Pembayaran.sum('jumlah_bayar', {
            where: { id_spp },
            where: { id_siswa },
        });
        res.json(total_bayar);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPembayaranWithJoin = async (req, res) => {
    try {
        const response = await Pembayaran.findAll({

            attributes: [
                'id_pembayaran',
                'id_petugas',
                'tgl_bayar',
                'id_spp',
                'jumlah_bayar',
                'keterangan',
                'status'
            ],
            include: [
                {
                    model: Siswa,
                    attributes: ['name', 'nisn'],
                    include: {
                        model: ClassRoom,
                        as: 'kelas',
                        attributes: ['angkatan', 'kelas'],
                    },
                },
                {
                    model: Petugas,
                    as: 'petugas',
                    attributes: ['nama_petugas']
                },
                {
                    model: Spp,
                    as: 'spp',
                    attributes: ['nominal', 'tahun']
                },

            ],
            limit: 6,
            order: [['id_pembayaran', 'DESC']]

        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createPembayaran = async (req, res) => {
    const id_petugas = req.body.id_petugas
    const id_siswa = req.body.id_siswa
    const tgl_bayar = req.body.tgl_bayar
    const id_spp = req.body.id_spp
    const jumlah_bayar = req.body.bayar
    const id_kelas = req.body.id_kelas
    const keterangan = req.body.keterangan
    const status = req.body.status

    try {
        await Pembayaran.create({
            id_petugas,
            id_siswa,
            tgl_bayar,
            id_spp,
            id_kelas,
            jumlah_bayar,
            keterangan,
            status
        });

        res.status(201).json({
            msg: "Pembayaran Berhasil"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deletePembayaran = async (req, res) => {
    const pembayaran = await Pembayaran.findOne({
        where: {
            id_pembayaran: req.params.id_pembayaran
        }
    });
    if (!pembayaran) return res.status(404).json({ msg: "No Data Found" });
    try {
        await Pembayaran.destroy({
            where: {
                id_pembayaran: req.params.id_pembayaran
            }
        });
        res.json({
            "message": "Pembayaran Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

