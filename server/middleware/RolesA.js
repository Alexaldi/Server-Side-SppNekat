import jwt from "jsonwebtoken";

export const authRoleA = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.id_petugas = decoded.id_petugas;
        if (decoded.level !== 'admin') {
            return res.status(401).send({ error: 'Anda Bukan Admin!' });
        }

        next();
    });

}

