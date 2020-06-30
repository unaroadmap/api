const Project = require('../models/Project');
const Candidate = require('../models/Candidate');
const Trail = require('../models/Trail');

module.exports = {
    async listProject(req, res) {
        const project = await Project.findAll({
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

            const project = await Project.findByPk(project_id);

            const { candidates, trails, ...data } = req.body;

            project.update(data);

            if (candidates && candidates.length > 0) {
                project.setCandidates(candidates);
            }

            if (trails && trails.length > 0) {
                project.setTrails(trails);
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