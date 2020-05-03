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
          const { email, password, status, profile } = req.body;
            
          const  user = await User.create({email,password,status, profile });
        return res.json(user);
    },
    async update(req, res, next) {
            
        const { email, password, status, profile } = req.body;
            
            User.update(
            {email,password,status, profile },
            {returning: true, where: {id: req.params.user_id}}
            )
            .then(updatedUser => {
                res.json(updatedUser)
            });
            
    }
};