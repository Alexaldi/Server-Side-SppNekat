import ClassRoom from "../models/ClassRoom.js";

export const getClassRooms = async (req, res) => {
    try {
        const kelas = await await ClassRoom.findAll({
            order: [
                ['angkatan', 'ASC'],
                ['kelas', 'ASC'],
            ],
        });;
        res.json(kelas);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getClassRoomById = async (req, res) => {
    try {
        const response = await ClassRoom.findAll({
            where: {
                id_kelas: req.params.id_kelas
            }
        });
        res.json(response[0]);
    } catch (error) {
        res.json({ message: error.message });
    }

}

export const saveClassRoom = async (req, res) => {
    try {
        await ClassRoom.create(req.body);
        res.json({
            "message": "Kelas Berhasil Ditambahkan"
        });
    } catch (error) {
        res.json({ message: error.message });
    }

}

export const updateClassRoom = async (req, res) => {
    try {
        await ClassRoom.update(req.body, {
            where: {
                id_kelas: req.params.id_kelas
            }
        });
        res.json({
            "message": "Kelas Telah Di Edit"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteClassRoom = async (req, res) => {
    const Kelas = await ClassRoom.findOne({
        where: {
            id_kelas: req.params.id_kelas
        }
    });
    if (!Kelas) return res.status(404).json({ msg: "No Data Found" });
    try {
        await ClassRoom.destroy({
            where: {
                id_kelas: req.params.id_kelas
            }
        });
        res.json({
            "message": "Kelas Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
