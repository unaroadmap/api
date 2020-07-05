const District = require('../models/District');

module.exports = {
    async listDistricts(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        const districts = await District.findAll();

        if(_start !== undefined) {
         
             const districts = await District.findAll({
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', districts != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(districts);
            } else {
                return res.json(districts); 
            }    
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