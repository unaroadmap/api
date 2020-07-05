const City = require('../models/City');

module.exports = {
    async listCitys(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        const citys = await City.findAll();
        const total = citys.length;

        if(_start !== undefined) {
         
             const citys = await City.findAll({
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', citys != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(citys);
            } else {
                return res.json(citys); 
            }    
    },
    async getCity(req, res) {
        const { city_id } = req.params;
      
        const city = await City.findByPk(city_id);

        return res.json(city);

    },
    async store(req, res) {
          
          const { name,state_id } = req.body;
            
          const  city = await City.create({name,state_id});
        return res.json(city);
    },
    async update(req, res, next) {
        const { city_id } = req.params;    
        const { name,state_id } = req.body;

            City.update(
            { name, state_id },
            {returning: true, where: {id: city_id}}
            )
            .then(updatedCity => {
                res.json(updatedCity)
            });
            
    },
    async delete(req, res, next) {
                  
            City.destroy({returning: true, where: {id: req.params.city_id}}
            )
            .then(deleteCity => {
                res.json(deleteCity)
            });
            
    }
};