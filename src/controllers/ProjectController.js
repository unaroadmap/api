const Project = require('../models/Project');
const Candidate = require('../models/Candidate');
const Trail = require('../models/Trail');

module.exports = {
    async listProject(req, res) {

        const {_start, _end, _order, _sort} = req.query;
        
        if(_start !== undefined) {
         
             const projects = await Project.findAll({
                offset: parseInt(_start), limit: parseInt(_end),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', projects != null ? projects.length : 0 );
         
             return res.json(projects);
            } else {
                return res.json(await Project.findAll({
                    include: [
                        {
                            model: Candidate,
                            as: 'candidates',
                            through: { attributes: [] },
                        },
                        {
                            model: Trail,
                            as: 'trails',
                            through: { attributes: [] },
                        }
                    ]
                })); 
            }    
       
    },

    async listProjectCandidate(req, res) {
        const { canditate_id } = req.params;
        const project = await Project.findOne({
            where:{ company_id: 1 },
        })
        return res.json(project);
    },
    async getProject(req, res) {
        const { project_id } = req.params;

        const project = await Project.findByPk(project_id);

        return res.json(project);

    },
    async store(req, res) {

        const { candidates, trails, ...data } = req.body;

        const project = await Project.create(data);

        if (candidates && candidates.length > 0) {
            project.setCandidates(candidates);
        }

        if (trails && trails.length > 0) {
            project.setTrails(trails);
        }

        return res.json(project);
    },
    async update(req, res, next) {

        try {
            const { project_id } = req.params;

            const { candidate_id, trail_id, ...data } = req.body;
            
            const project = await Project.findByPk(project_id);

            project.update(data);
            console.log(candidate_id)
            if (candidate_id !== undefined && candidate_id !== null) {
                await Project.sequelize.query('INSERT INTO projects_candidates (candidate_id,project_id) VALUES (?,?)',
                      { replacements: [candidate_id,project_id], type: Project.sequelize.QueryTypes.INSERT}
                ).then(function(projects) {
                    console.log(projects)
                });
            }

            if (trail_id !== undefined && trail_id !== null) {
                await Trail.sequelize.query('INSERT INTO projects_trails (trail_id,project_id) VALUES (?,?)',
                    { replacements: [trail_id,project_id], type: Trail.sequelize.QueryTypes.INSERT}
                ).then(function(trails) {
                    console.log(trails)
                });
            }
        
            return res.status(200).json(project);
        } catch (err) {
            return res.status(500).json({ err });
        }

    },
    async delete(req, res, next) {

        Project.destroy({ returning: true, where: { id: req.params.project_id } }
        )
            .then(deleteProject => {
                res.json(deleteProject)
            });

    }
};