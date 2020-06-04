const Project = require('../models/Project');

module.exports = {
    async listProject(req, res) {
     const project = await Project.findAll();

        return res.json(project);
    },
    async getProject(req, res) {
        const { project_id } = req.params;
      
        const project = await Project.findByPk(project_id);

        return res.json(project);

    },
    async store(req, res) {
          
          const { name, company_id, description } = req.body;
            
          const  project = await Project.create({name, company_id,description});
        return res.json(project);
    },
    async update(req, res, next) {
        const { project_id } = req.params;    
        const { name, company_id, description } = req.body;

            Project.update(
            { name, company_id, description },
            {returning: true, where: {id: project_id}}
            )
            .then(updatedProject => {
                res.json(updatedProject)
            });
            
    },
    async delete(req, res, next) {
                  
            Project.destroy({returning: true, where: {id: req.params.project_id}}
            )
            .then(deleteProject => {
                res.json(deleteProject)
            });
            
    }
};