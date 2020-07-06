const Project = require('../models/Project');
const Candidate = require('../models/Candidate');
const Trail = require('../models/Trail');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async listProject(req, res) {
        
        const {_start, _end, _order, _sort, q} = req.query;
        const condition = q ? { name: { [Op.like]: `%${q}%`}} : null;

        const projects = await Project.findAll({
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
        });
        const total = projects.length;

        if(_start !== undefined) {
         
             const projects = await Project.findAll({
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
                ],
                where:
                    condition
                ,
                offset: parseInt(_start), limit: parseInt(_end-_start),
                 order: [
                [_sort, _order]]
             });
    
             res.header('Access-Control-Expose-Headers', '*');
             res.header('X-Total-Count', projects != null ? _start +'-'+ _end +'/' + total : 0 );
         
             return res.json(projects);
            } else {
                return res.json(projects); 
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

        const project = await Project.findByPk(project_id,{
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
        });

        return res.json(project);

    },
    async store(req, res) {

        const { candidates, trails, ...data } = req.body;

        const project = await Project.create(data);

        let arrCandidates = [];
        let arrTrilhas = [];


        for(let p in candidates)
            arrCandidates.push(candidates[p]["id"]);

        for(let p in trails)
            arrTrilhas.push(trails[p]["id"]);

        if (arrCandidates && arrCandidates.length > 0) {
            project.setCandidates(arrCandidates);
        }

        if (arrTrilhas && arrTrilhas.length > 0) {
            project.setTrails(arrTrilhas);
        }

        return res.json(project);
    },
    async update(req, res, next) {

        try {
            const { project_id } = req.params;

            const { candidate_id, trail_id, candidates, trails, ...data } = req.body;
            
            const project = await Project.findByPk(project_id);
      
            project.update(data);
            
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

            let arrCandidates = [];
            let arrTrilhas = [];


            for(let p in candidates)
                arrCandidates.push(candidates[p]["id"]);

            for(let p in trails)
                arrTrilhas.push(trails[p]["id"]);

            if (arrCandidates && arrCandidates.length > 0) {
                project.setCandidates(arrCandidates);
            }

            if (arrTrilhas && arrTrilhas.length > 0) {
                project.setTrails(arrTrilhas);
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

    },
    async removeCandidateProject(req, res, next) {
        const { candidate_id, project_id } = req.params;

        await Project.sequelize.query('delete from projects_candidates where candidate_id = ? and project_id = ?',
            { replacements: [candidate_id,project_id], type: Project.sequelize.QueryTypes.DELETE}
        ).then(function(projects){
            return res.status(200).json("Success");
        });
    }
};