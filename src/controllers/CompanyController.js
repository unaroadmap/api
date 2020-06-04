const Company = require('../models/Company');

module.exports = {
    async listCompany(req, res) {
     const company = await Company.findAll();

        return res.json(company);
    },
    async getCompany(req, res) {
        const { company_id } = req.params;
      
        const company = await Company.findByPk(company_id);

        return res.json(company);

    },
    async store(req, res) {
          
          const { name, cnpj, user_id, email, telephone, cell_phone } = req.body;
            
          const  company = await Company.create({name, cnpj, user_id, email, telephone, cell_phone});
        return res.json(company);
    },
    async update(req, res, next) {
        const { company_id } = req.params;    
        const { name, cnpj, user_id, email, telephone, cell_phone } = req.body;

            Company.update(
            { name, cnpj, user_id, email, telephone, cell_phone },
            {returning: true, where: {id: company_id}}
            )
            .then(updatedCompany => {
                res.json(updatedCompany)
            });
            
    },
    async delete(req, res, next) {
                  
            Company.destroy({returning: true, where: {id: req.params.company_id}}
            )
            .then(deleteCompany => {
                res.json(deleteCompany)
            });
            
    }
};