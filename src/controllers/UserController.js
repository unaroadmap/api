const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

const queryUserProjects = 'select p4.* from `candidate` p2'
+' inner join `projects_candidates` p3 on p3.candidate_id = p2.id'
+' inner join `project` p4 on p3.project_id = p4.id'
+' where p2.user_id = :user_id';


module.exports = {
    async listUsers(req, res) {
     const {_start, _end, _order, _sort} = req.query;
     
     const users = await User.findAll();
     const total = users.length;

    if(_start !== undefined) {
     
         const users = await User.findAll({
            offset: parseInt(_start), limit: parseInt(_end-_start),
             order: [
            [_sort, _order]]
         });

         res.header('Access-Control-Expose-Headers', '*');
         res.header('X-Total-Count', users != null ? _start +'-'+ _end +'/' + total : 0 );
        
         return res.json(users);
        } else {
            return res.json(users); 
        }    
      
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
        
        const password = await bcrypt.hash(req.body.password, 10);

        const { email, status, profile, address_id } = req.body;
            
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
                         email: usuario.email,
                         permissions: usuario.profile 
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
    },
    async getUserProjects(req, res) {
        console.log(req.params.user_id);
        await User.sequelize.query(queryUserProjects, 
                    { replacements: { user_id: req.params.user_id }, type: User.sequelize.QueryTypes.SELECT }
                  ).then(function(projects) {
                    return res.json(projects);
        })
    },
    async delete(req, res, next) {
           try {       
            User.destroy({returning: true, where: {id: req.params.user_id}}
            )
            .then(deleteUser => {
                res.json(deleteUser)
            });
            return res.status(200).send( 'Usuário excluido com sucesso');

        } catch (err) {
            return res.status(400).send('Erro ao excluir Usuário');
        }

            
    }

};