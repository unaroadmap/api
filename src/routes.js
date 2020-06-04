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



routes.get('/users', UserController.listUsers);
routes.get('/users/:user_id', UserController.getUser);
routes.post('/users', UserController.store);
routes.put('/users/:user_id', UserController.update);

routes.get('/states', StateController.listStates);
routes.get('/states/:state_id', StateController.getState);
routes.post('/states', StateController.store);
routes.put('/states/:state_id', StateController.update);
routes.delete('/states/:state_id', StateController.delete);

routes.get('/citys', CityController.listCitys);
routes.get('/citys/:city_id', CityController.getCity);
routes.post('/citys', CityController.store);
routes.put('/citys/:city_id', CityController.update);
routes.delete('/citys/:city_id', CityController.delete);

routes.get('/districts', DistrictController.listDistricts);
routes.get('/districts/:district_id', DistrictController.getDistrict);
routes.post('/districts', DistrictController.store);
routes.put('/districts/:district_id', DistrictController.update);
routes.delete('/districts/:district_id', DistrictController.delete);

routes.get('/address', AddressController.listAddresss);
routes.get('/address/:address_id', AddressController.getAddress);
routes.post('/address', AddressController.store);
routes.put('/address/:address_id', AddressController.update);
routes.delete('/address/:address_id', AddressController.delete);


routes.get('/candidates', CandidateController.listCandidate);
routes.get('/candidates/:candidate_id', CandidateController.getCandidate);
routes.post('/candidates', CandidateController.store);
routes.put('/candidates/:candidate_id', CandidateController.update);
routes.delete('/candidates/:candidate_id', CandidateController.delete);

routes.get('/companys', CompanyController.listCompany);
routes.get('/companys/:company_id', CompanyController.getCompany);
routes.post('/companys', CompanyController.store);
routes.put('/companys/:company_id', CompanyController.update);
routes.delete('/companys/:company_id', CompanyController.delete);


routes.get('/projects', ProjectController.listProject);
routes.get('/projects/:project_id', ProjectController.getProject);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:project_id', ProjectController.update);
routes.delete('/projects/:project_id', ProjectController.delete);

routes.get('/occupations', OccupationController.listOccupation);
routes.get('/occupations/:occupation_id', OccupationController.getOccupation);
routes.post('/occupations', OccupationController.store);
routes.put('/occupations/:occupation_id', OccupationController.update);
routes.delete('/occupations/:occupation_id', OccupationController.delete);


//routes.get('/users/:user_id/addresses', AddressController.index);
//routes.post('/users/:user_id/addresses', AddressController.store);

//routes.get('/users/:user_id/techs', TechController.index);
//routes.post('/users/:user_id/techs', TechController.store);
//routes.delete('/users/:user_id/techs', TechController.delete);

//routes.get('/report', ReportController.show);

module.exports = routes;