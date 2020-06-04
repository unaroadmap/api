const Trail = require('../models/Trail');

module.exports = {
    async listTrail(req, res) {
     const trail = await Trail.findAll();

        return res.json(trail);
    },
    async getTrail(req, res) {
        const { trail_id } = req.params;
      
        const trail = await Trail.findByPk(trail_id);

        return res.json(trail);

    },
    async store(req, res) {
          
          const { name, description } = req.body;
            
          const  trail = await Trail.create({name,description});
        return res.json(trail);
    },
    async update(req, res, next) {
        const { trail_id } = req.params;    
        const { name, description } = req.body;

            Trail.update(
            { name, description },
            {returning: true, where: {id: trail_id}}
            )
            .then(updatedTrail => {
                res.json(updatedTrail)
            });
            
    },
    async delete(req, res, next) {
                  
            Trail.destroy({returning: true, where: {id: req.params.trail_id}}
            )
            .then(deleteTrail => {
                res.json(deleteTrail)
            });
            
    }
};