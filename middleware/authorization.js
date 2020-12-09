const jwt=require('jsonwebtoken')

module.exports = {
    authenticateAccess: (req, res, next) => {
        const authToken = req.headers.authorization;

        if (authToken === null)
            return res.sendStatus(401);

        // console.log(req.headers);
        jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
            if (err) return res.sendStatus(403);
            req.userId = userId._id;
            next();
        });
    }
}
