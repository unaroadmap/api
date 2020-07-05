const Address = require('../models/Address');
const District = require('../models/District');
const City = require('../models/City');
const State = require('../models/State');


module.exports = {
    async listAddresss(req, res) {
      const {_start, _end, _order, _sort} = req.query;
      const address = await Address.findAll();
      const total = address.length;

    if(_start !== undefined) {
     
         const address = await Address.findAll({
            offset: parseInt(_start), limit: parseInt(_end-_start),
             order: [
            [_sort, _order]]
         });

         res.header('Access-Control-Expose-Headers', '*');
         res.header('X-Total-Count', address != null ? _start +'-'+ _end +'/' + total : 0 );
     
         return res.json(address);
        } else {
            return res.json(address); 
        }    
    },
    async getAddress(req, res) {
        const { address_id } = req.params;
      
        const address = await Address.findByPk(address_id);

        return res.json(address);

    },
    async store(req, res) {
          const { cep,logradouro,complement,number, district, city, uf,user_id } = req.body;
          const cityAux = null;
          const districtAux = await District.findOne({ where: {name: district}});

          if(districtAux === null) {
            this.cityAux = await City.findOne({ where: {name: city}});
            
            if(this.cityAux === null) {
              const { id } = await State.findOne({ where: {sigla: uf}});
              this.cityAux = await City.create({name: city, state_id: id});
            }

            this.districtAux = await District.create({name: district, city_id: this.cityAux.id});
            
          }
    
          const  address = await Address.create({cep,logradouro,complement,number,district_id: districtAux.id, user_id});
       
          return res.json(address);
    },
    async update(req, res, next) {
        const { address_id } = req.params;    
        const { cep,logradouro,complement,number, district, city, uf ,user_id } = req.body;

        const cityAux = null;
        const districtAux = await District.findOne({ where: {name: district}});

        if(districtAux === null) {
          this.cityAux = await City.findOne({ where: {name: city}});
          
          if(this.cityAux === null) {
            const { id } = await State.findOne({ where: {sigla: uf}});
            this.cityAux = await City.create({name: city, state_id: id});
          }

          this.districtAux = await District.create({name: district, city_id: this.cityAux.id});
          
        }

        Address.update(
            { cep,logradouro,complement,number,district_id: this.districtAux.id,user_id },
            {returning: true, where: {id: address_id}}
            )
            .then(updatedAddress => {
                res.json(updatedAddress)
            });
            
    },
    async delete(req, res, next) {
                  
            Address.destroy({returning: true, where: {id: req.params.address_id}}
            )
            .then(deleteAddress => {
                res.json(deleteAddress)
            });
            
    }
};