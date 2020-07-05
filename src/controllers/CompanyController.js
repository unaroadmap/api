const Company = require('../models/Company');

module.exports = {
    async listCompany(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        const companys = await Company.findAll();
        const total = companys.length; 

        if(_start !== undefined) {
         
             const companys = await Company.findAll({
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', companys != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(companys);
            } else {
                return res.json(companys); 
            }    
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