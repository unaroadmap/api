const User = require('../models/User');

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
       try{
        
        const { email, password, status, profile, address_id } = req.body;
            
        const  user = await User.create({email,password,status, profile, address_id });
        
        return res.status(200).send(user);
       } catch (err) {
           return res.status(400).send({ error: err });
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
            
    }
};