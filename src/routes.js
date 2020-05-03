const routes = require("express").Router();
const UserController = require('./controllers/UserController');
const StateController = require('./controllers/StateController');
const CityController = require('./controllers/CityController');
const DistrictController = require('./controllers/DistrictController');
const AddressController = require('./controllers/AddressController');
const CandidateController = require('./controllers/CandidateController');
//const ReportController = require('./controllers/ReportController');


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

//routes.get('/users/:user_id/addresses', AddressController.index);
//routes.post('/users/:user_id/addresses', AddressController.store);

//routes.get('/users/:user_id/techs', TechController.index);
//routes.post('/users/:user_id/techs', TechController.store);
//routes.delete('/users/:user_id/techs', TechController.delete);

//routes.get('/report', ReportController.show);

module.exports = routes;