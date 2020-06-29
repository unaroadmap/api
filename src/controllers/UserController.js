const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async listUsers(req, res) {
     const users = await User.findAll();

        return res.json(users);
    },

    async getUser(req, res) {
        const { user_id } = req.params;
      
        const user = await User.findByPk(user_id);

        return res.json(user);

    },
    async store(req, res) {
 
        try {
            const password = await bcrypt.hash(req.body.password, 10);

            const { email, status, profile, address_id } = req.body;
            const user = await User.create({ email, password, status, profile, address_id });
            return res.status(200).send( { id:user.id, email, status, profile} );

        } catch (err) {
            return res.status(400).send({ 'error': err });
        }
    },
    async update(req, res, next) {
            
        const { email, password, status, profile, address_id } = req.body;
            
            User.update(
            {email,password,status, profile, address_id },
            {returning: true, where: {id: req.params.user_id}}
            )
            .then(updatedUser => {
                res.json(updatedUser)
            });
            
    },
    async login(req, res) {
        const { email,password } = req.body;
         User.findOne({
               where: {
                   email: email
                }
            }).then(function(usuario) {
                if(!usuario){
                    return res.status(401).send( {msg: 'Falha na autenticação' });
                }
                bcrypt.compare(password, usuario.password, (err, result) => {
                    if (err) {
                        return res.status(401).send( {msg: 'Falha na autenticação' });
                    }

                    if(result) {
                        const token = jwt.sign({
                         id: usuario.id,
                         email: usuario.email
                        }, 'mgceldr21',
                        {
                            expiresIn: "1h"
                        }                        
                        );
                        return res.status(200).send( { msg: 'Autenticado com sucesso',
                                                       token: token,
                                                       id: usuario.id,
                                                       email: usuario.email,
                                                       status: usuario.status,
                                                       profile: usuario.profile,
                                                     });
                    }

                    return res.status(401).send( {msg: 'Falha na autenticação' });
                });
                                      
            });
    }
};