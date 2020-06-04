const Occupation = require('../models/Occupation');

module.exports = {
    async listOccupation(req, res) {
     const occupation = await Occupation.findAll();

        return res.json(occupation);
    },
    async getOccupation(req, res) {
        const { occupation_id } = req.params;
      
        const occupation = await Occupation.findByPk(occupation_id);

        return res.json(occupation);

    },
    async store(req, res) {
          
          const { name, company_id, description } = req.body;
            
          const  occupation = await Occupation.create({name, company_id,description});
        return res.json(occupation);
    },
    async update(req, res, next) {
        const { occupation_id } = req.params;    
        const { name, company_id, description } = req.body;

            Occupation.update(
            { name, company_id, description },
            {returning: true, where: {id: occupation_id}}
            )
            .then(updatedOccupation => {
                res.json(updatedOccupation)
            });
            
    },
    async delete(req, res, next) {
                  
            Occupation.destroy({returning: true, where: {id: req.params.occupation_id}}
            )
            .then(deleteOccupation => {
                res.json(deleteOccupation)
            });
            
    }
};