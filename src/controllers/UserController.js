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
    async update(req, res) {
                
        const { id, email, password, status, profile } = req.body;
            
        const user = await User.update({id,email,password,status, profile });
        
       
       return res.json(user);
    },
    async delete(req, res) {
        const { user_id } = req.params;
      
        const user = await User.findByPk(user_id);
  
        if (!user) {
            return res.status(400).json({ error: 'Usuario não encontrado'});
        }
        
        await User.update({id: user_id, active: 'Deleted'});

        return res.json();

    }
};