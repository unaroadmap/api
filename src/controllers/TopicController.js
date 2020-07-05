const Topic = require('../models/Topic');

module.exports = {
    async listTopic(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        const topics = await Topic.findAll();
        const total = topics.length;

        if(_start !== undefined) {
         
             const topics = await Topic.findAll({
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', topics != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(topics);
            } else {
                return res.json(topics); 
            }    
    },
    async getTopic(req, res) {
        const { topic_id } = req.params;
      
        const topic = await Topic.findByPk(topic_id);

        return res.json(topic);

    },
    async store(req, res) {
          
          const { name, description, url, order, trail_id } = req.body;
            
          const  topic = await Topic.create({name, description, url, order, trail_id});
        return res.json(topic);
    },
    async update(req, res, next) {
        const { topic_id } = req.params;    
        const { name, description, url, order } = req.body;

            Topic.update(
            { name, description, url, order },
            {returning: true, where: {id: topic_id}}
            )
            .then(updatedTopic => {
                res.json(updatedTopic)
            });
            
    },
    async delete(req, res, next) {
                  
            Topic.destroy({returning: true, where: {id: req.params.topic_id}}
            )
            .then(deleteTopic => {
                res.json(deleteTopic)
            });
            
    }
};