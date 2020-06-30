const routes = require("express").Router();
const UserController = require('./controllers/UserController');
const StateController = require('./controllers/StateController');
const CityController = require('./controllers/CityController');
const DistrictController = require('./controllers/DistrictController');
const AddressController = require('./controllers/AddressController');
const CandidateController = require('./controllers/CandidateController');
const CompanyController = require('./controllers/CompanyController');
const ProjectController = require('./controllers/ProjectController');
const OccupationController = require('./controllers/OccupationController');
const TrailController = require('./controllers/TrailController');
const DocumentController = require('./controllers/DocumentController');
const TopicController = require('./controllers/TopicController');
const login = require('./middleware/login');

routes.get('/users',login.private, UserController.listUsers);
routes.get('/users/:user_id',login.private, UserController.getUser);
routes.post('/users',login.public, UserController.store);
routes.post('/users/login',login.public, UserController.login);
routes.put('/users/:user_id',login.public, UserController.update);

routes.get('/states',login.private, StateController.listStates);
routes.get('/states/:state_id',login.private, StateController.getState);
routes.post('/states',login.private, StateController.store);
routes.put('/states/:state_id',login.private, StateController.update);
routes.delete('/states/:state_id',login.private, StateController.delete);

routes.get('/citys',login.private, CityController.listCitys);
routes.get('/citys/:city_id',login.private, CityController.getCity);
routes.post('/citys',login.private, CityController.store);
routes.put('/citys/:city_id',login.private, CityController.update);
routes.delete('/citys/:city_id',login.private, CityController.delete);

routes.get('/districts',login.private, DistrictController.listDistricts);
routes.get('/districts/:district_id',login.private, DistrictController.getDistrict);
routes.post('/districts',login.private, DistrictController.store);
routes.put('/districts/:district_id',login.private, DistrictController.update);
routes.delete('/districts/:district_id',login.private, DistrictController.delete);

routes.get('/address',login.private, AddressController.listAddresss);
routes.get('/address/:address_id',login.private, AddressController.getAddress);
routes.post('/address',login.private, AddressController.store);
routes.put('/address/:address_id',login.private, AddressController.update);
routes.delete('/address/:address_id',login.private, AddressController.delete);


routes.get('/candidates',login.private, CandidateController.listCandidate);
routes.get('/candidates/user/:user_id',login.private, CandidateController.getCandidateByUser);
routes.get('/candidates/:candidate_id',login.private, CandidateController.getCandidate);
routes.post('/candidates',login.private, CandidateController.store);
routes.put('/candidates/:candidate_id',login.private, CandidateController.update);
routes.delete('/candidates/:candidate_id',login.private, CandidateController.delete);


routes.get('/companys',login.private, CompanyController.listCompany);
routes.get('/companys/:company_id',login.private, CompanyController.getCompany);
routes.post('/companys',login.private, CompanyController.store);
routes.put('/companys/:company_id',login.private, CompanyController.update);
routes.delete('/companys/:company_id',login.private, CompanyController.delete);

routes.get('/projects/:candidate_id', login.private, ProjectController.listProjectCandidate);
routes.get('/projects', login.private, ProjectController.listProject);
routes.get('/projects/:project_id', login.private, ProjectController.getProject);
routes.post('/projects', login.private, ProjectController.store);
routes.put('/projects/:project_id', login.private, ProjectController.update);
routes.delete('/projects/:project_id', login.private, ProjectController.delete);

routes.get('/occupations', login.private, OccupationController.listOccupation);
routes.get('/occupations/:occupation_id', login.private, OccupationController.getOccupation);
routes.post('/occupations',login.private, OccupationController.store);
routes.put('/occupations/:occupation_id',login.private, OccupationController.update);
routes.delete('/occupations/:occupation_id',login.private, OccupationController.delete);

routes.get('/trails',login.private, TrailController.listTrail);
routes.get('/trails/:trail_id',login.private, TrailController.getTrail);
routes.post('/trails',login.private, TrailController.store);
routes.put('/trails/:trail_id',login.private, TrailController.update);
routes.delete('/trails/:trail_id',login.private, TrailController.delete);

routes.get('/documents',login.private, DocumentController.listDocument);
routes.get('/documents/:document_id',login.private, DocumentController.getDocument);
routes.post('/documents',login.private, DocumentController.store);
routes.put('/documents/:document_id',login.private, DocumentController.update);
routes.delete('/documents/:document_id',login.private, DocumentController.delete);

routes.get('/topics',login.private, TopicController.listTopic);
routes.get('/topics/:topic_id',login.private, TopicController.getTopic);
routes.post('/topics',login.private, TopicController.store);
routes.put('/topics/:topic_id',login.private, TopicController.update);
routes.delete('/topics/:topic_id',login.private, TopicController.delete);


//routes.get('/users/:user_id/addresses', AddressController.index);
//routes.post('/users/:user_id/addresses', AddressController.store);

//routes.get('/users/:user_id/techs', TechController.index);
//routes.post('/users/:user_id/techs', TechController.store);
//routes.delete('/users/:user_id/techs', TechController.delete);

//routes.get('/report', ReportController.show);

module.exports = routes;