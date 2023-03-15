import db from "../config/Database.js";
import Spp from "../models/SppModel.js";
export const getSpp = async (req, res) => {
    try {
        const spp = await Spp.findAll();
        res.json(spp);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getSppById = async (req, res) => {
    try {
        const response = await Spp.findOne({
            where: {
                id_spp: req.params.id_spp
            }
        });
        res.json(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createSpp = async (req, res) => {
    const nominal = req.body.nominal
    const tahun = req.body.tahun

    try {
        await db.transaction(async (t) => {
            const existingSpp = await Spp.findOne(
                {
                    where: {
                        tahun
                    }
                }, { transaction: t });
            if (existingSpp) {
                return res.status(400).json({
                    msg: `Nominal tahun ${tahun} sudah ada`,
                });
            }

            await Spp.create({
                nominal,
                tahun
            }, { transaction: t });
            res.status(201).json({
                msg: "Spp Berhasil Dibuat"
            })
        })

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateSpp = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            await Spp.update(req.body, {
                where: {
                    id_spp: req.params.id_spp
                }
            }, { transaction: t });
            res.json({
                "message": "Spp Telah Di Edit"
            }, { transaction: t });
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteSpp = async (req, res) => {
    const spp = await Spp.findOne({
        where: {
            id_spp: req.params.id_spp
        }
    });
    if (!spp) return res.status(404).json({ msg: "No Data Found" });
    try {
        await Spp.destroy({
            where: {
                id_spp: req.params.id_spp
            }
        });
        res.json({
            "message": "Spp Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
