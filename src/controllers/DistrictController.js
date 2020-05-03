const District = require('../models/District');

module.exports = {
    async listDistricts(req, res) {
     const districts = await District.findAll();

        return res.json(districts);
    },
    async getDistrict(req, res) {
        const { district_id } = req.params;
      
        const district = await District.findByPk(district_id);

        return res.json(district);

    },
    async store(req, res) {
          
          const { name,city_id } = req.body;
            
          const  district = await District.create({name,city_id});
        return res.json(district);
    },
    async update(req, res, next) {
        const { district_id } = req.params;    
        const { name,city_id } = req.body;

            District.update(
            { name, city_id },
            {returning: true, where: {id: district_id}}
            )
            .then(updatedDistrict => {
                res.json(updatedDistrict)
            });
            
    },
    async delete(req, res, next) {
                  
            District.destroy({returning: true, where: {id: req.params.district_id}}
            )
            .then(deleteDistrict => {
                res.json(deleteDistrict)
            });
            
    }
};