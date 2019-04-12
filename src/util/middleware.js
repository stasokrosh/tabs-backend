
export function parseJWT(req, res, next) {
    let token = req.headers['Authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(400).end();
            } else {
                req.decoded = decoded; 
                next();
            }
        });
    } else {
        next();
    }
}