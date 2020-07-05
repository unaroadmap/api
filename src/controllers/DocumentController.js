const Document = require('../models/Document');

module.exports = {
    async listDocument(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        
        if(_start !== undefined) {
         
             const documents = await Document.findAll({
                offset: parseInt(_start), limit: parseInt(_end),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', documents != null ? documents.length : 0 );
         
             return res.json(documents);
            } else {
                return res.json(await Document.findAll()); 
            }    
    },
    async getDocument(req, res) {
        const { document_id } = req.params;
      
        const document = await Document.findByPk(document_id);

        return res.json(document);

    },
    async store(req, res) {
          
          const { cpf, pis, rg, titulo_eleitor, titulo_zona, titulo_secao, certif_militar, cnh, ctps, ctps_serie, candidate_id } = req.body;
            
          const  document = await Document.create({cpf, pis, rg, titulo_eleitor, titulo_zona, titulo_secao, certif_militar, cnh, ctps, ctps_serie, candidate_id});
        return res.json(document);
    },
    async update(req, res, next) {
        const { document_id } = req.params;    
        const { cpf, pis, rg, titulo_eleitor, titulo_zona, titulo_secao, certif_militar, cnh, ctps, ctps_serie, candidate_id } = req.body;

            Document.update(
            { cpf, pis, rg, titulo_eleitor, titulo_zona, titulo_secao, certif_militar, cnh, ctps, ctps_serie, candidate_id },
            {returning: true, where: {id: document_id}}
            )
            .then(updatedDocument => {
                res.json(updatedDocument)
            });
            
    },
    async delete(req, res, next) {
                  
            Document.destroy({returning: true, where: {id: req.params.document_id}}
            )
            .then(deleteDocument => {
                res.json(deleteDocument)
            });
            
    }
};