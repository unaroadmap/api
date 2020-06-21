const Trail = require('../models/Trail');
const Topic = require('../models/Topic');

module.exports = {
    async listTrail(req, res) {
     const trail = await Trail.findAll({
         include: [
             {
                 model: Topic,
                 as: 'topics',
                 through: { attributes: []},
             }
         ]
     });

        return res.json(trail);
    },
    async getTrail(req, res) {
        const { trail_id } = req.params;
      
        const trail = await Trail.findByPk(trail_id);

        return res.json(trail);

    },
    async store(req, res) {
          
        const { topics, ...data } = req.body;
            
        const  trail = await Trail.create(data);
        
        if(topics && topics.length > 0) {
            trail.setTopics(topics);
        }

        return res.json(trail);
    },
    async update(req, res, next) {
        try {
        const { trail_id } = req.params;

        const trail = await Trail.findByPk(trail_id);

        const { topics, ...data } = req.body;

        trail.update(data);

        
        if(topics && topics.length > 0) {
            trail.setTopics(topics);
            
        }

            return res.status(200).json(topics);
        } catch(err) {
            return res.status(500).json({ err }); 
        }
            
    },
    async delete(req, res, next) {
                  
            Trail.destroy({returning: true, where: {id: req.params.trail_id}}
            )
            .then(deleteTrail => {
                res.json(deleteTrail)
            });
            
    }
};