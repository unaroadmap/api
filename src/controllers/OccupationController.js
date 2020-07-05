const Occupation = require('../models/Occupation');

module.exports = {
    async listOccupation(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        
        if(_start !== undefined) {
         
             const occupations = await Occupation.findAll({
                offset: parseInt(_start), limit: parseInt(_end),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', occupations != null ? occupations.length : 0 );
         
             return res.json(occupations);
            } else {
                return res.json(await Occupation.findAll()); 
            }    
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