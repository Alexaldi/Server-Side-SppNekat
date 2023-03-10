import Petugas from "../models/Petugas.js"

export const refreshToken2 = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.sendStatus(401);
        const petugas = await Petugas.findAll({
            where: {
                refresh_token: accessToken
            }
        });
        if (!petugas[0]) return res.sendStatus(403);
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
    }
}