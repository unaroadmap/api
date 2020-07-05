const State = require('../models/State');

module.exports = {
    async listStates(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        
        if(_start !== undefined) {
         
             const states = await State.findAll({
                offset: parseInt(_start), limit: parseInt(_end),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', states != null ? states.length : 0 );
         
             return res.json(states);
            } else {
                return res.json(await State.findAll()); 
            }    
    },
    async getState(req, res) {
        const { state_id } = req.params;
      
        const state = await State.findByPk(state_id);

        return res.json(state);

    },
    async store(req, res) {
          const { name, sigla } = req.body;
            
          const  state = await State.create({name,sigla});
        return res.json(state);
    },
    async update(req, res, next) {
            
        const { name, sigla } = req.body;
            
            State.update(
            {name,sigla },
            {returning: true, where: {id: req.params.state_id}}
            )
            .then(updatedState => {
                res.json(updatedState)
            });
            
    },
    async delete(req, res, next) {
                  
            State.destroy({returning: true, where: {id: req.params.state_id}}
            )
            .then(deleteState => {
                res.json(deleteState)
            });
            
    }
};