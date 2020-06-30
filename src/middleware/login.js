const jwt = require('jsonwebtoken');

exports.private = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'mgceldr21');
        req.usuario = decode;
        next();
    } catch(error){
        return res.status(401).send({ msg: 'Falha na autenticação', erro: error});
    }
    
}

exports.public = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'mgceldr21');
        req.usuario = decode;
        next();
    } catch(error){
        next();
    }
    
}