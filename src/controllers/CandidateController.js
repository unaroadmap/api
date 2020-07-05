const Candidate = require('../models/Candidate');

module.exports = {
    async listCandidate(req, res) {
        const {_start, _end, _order, _sort} = req.query;
        
        if(_start !== undefined) {
         
             const candidates = await Candidate.findAll({
                offset: parseInt(_start), limit: parseInt(_end),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', candidates != null ? candidates.length : 0 );
         
             return res.json(candidates);
            } else {
                return res.json(await Candidate.findAll()); 
            }    
    },
    async getCandidate(req, res) {
        const { candidate_id } = req.params;
      
        const candidate = await Candidate.findByPk(candidate_id);

        return res.json(candidate);

    },

    async getCandidateByUser(req, res) {
        const { user_id } = req.params;
        const candidate = await Candidate.findOne({
            where:{ user_id: user_id },
        })
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
            
    },
    async setCandidateProject(req, res, next) {
        const { candidate_id, project_id } = req.params;
        
        await Project.sequelize.query('INSERT INTO projects_candidates (candidate_id,project_id) VALUES (?,?)',
                      { replacements: [candidate_id,project_id], type: Project.sequelize.QueryTypes.INSERT}
                ).then(function(projects) {
                    console.log(projects)
                });
    }
};