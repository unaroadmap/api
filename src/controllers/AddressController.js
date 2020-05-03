const Address = require('../models/Address');

module.exports = {
    async listAddresss(req, res) {
     const addresss = await Address.findAll();

        return res.json(addresss);
    },
    async getAddress(req, res) {
        const { address_id } = req.params;
      
        const address = await Address.findByPk(address_id);

        return res.json(address);

    },
    async store(req, res) {
          
          const { cep,logradouro,complement,number,district_id,user_id } = req.body;
            
          const  address = await Address.create({cep,logradouro,complement,number,district_id,user_id});
        return res.json(address);
    },
    async update(req, res, next) {
        const { address_id } = req.params;    
        const { cep,logradouro,complement,number,district_id,user_id } = req.body;

            Address.update(
            { cep,logradouro,complement,number,district_id,user_id },
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