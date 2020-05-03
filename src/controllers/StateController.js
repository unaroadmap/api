const State = require('../models/State');

module.exports = {
    async listStates(req, res) {
     const states = await State.findAll();

        return res.json(states);
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