const Trail = require('../models/Trail');
const Topic = require('../models/Topic');

module.exports = {
    async listTrail(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        
        const trails = await Trail.findAll({
            include: [
                {
                    model: Topic,
                    as: 'topics',
                    through: { attributes: []},
                }
            ]
        });

        const total = trails.length;

        if(_start !== undefined) {
         
             const trails = await Trail.findAll({
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', trails != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(trails);
            } else {
                return res.json(trails); 
            }    
     
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