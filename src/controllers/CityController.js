const City = require('../models/City');

module.exports = {
    async listCitys(req, res) {
     const citys = await City.findAll();

        return res.json(citys);
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