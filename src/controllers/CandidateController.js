const Candidate = require('../models/Candidate');

module.exports = {
    async listCandidate(req, res) {
     const candidate = await Candidate.findAll();

        return res.json(candidate);
    },
    async getCandidate(req, res) {
        const { candidate_id } = req.params;
      
        const candidate = await Candidate.findByPk(candidate_id);

        return res.json(candidate);

    },
    
    
    async store(req, res) {
          
          const { name, birthday, sexo, schooling, nationality, mother_name, father_name, telephone, cell_phone, user_id } = req.body;
            
          const  candidate = await Candidate.create({name, birthday, sexo, schooling, nationality, mother_name, father_name, telephone, cell_phone, user_id});
          
         return res.json(candidate);
    },

    async update(req, res, next) {
        const { candidate_id } = req.params;    
        const { name, birthday, sexo, schooling, nationality, mother_name, father_name, telephone, cell_phone, user_id } = req.body;

            Candidate.update(
            { name, birthday, sexo, schooling, nationality, mother_name, father_name, telephone, cell_phone, user_id },
            {returning: true, where: {id: candidate_id}}
            )
            .then(updatedCandidate => {
                res.json(updatedCandidate)
            });
            
    },
    async delete(req, res, next) {
                  
            Candidate.destroy({returning: true, where: {id: req.params.candidate_id}}
            )
            .then(deleteCandidate => {
                res.json(deleteCandidate)
            });
            
    }
};