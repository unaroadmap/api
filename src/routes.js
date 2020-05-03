const routes = require("express").Router();
const UserController = require('./controllers/UserController');
const StateController = require('./controllers/StateController');
//const AddressController = require('./controllers/AddressController');
//const TechController = require('./controllers/TechController');
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

//routes.get('/users/:user_id/addresses', AddressController.index);
//routes.post('/users/:user_id/addresses', AddressController.store);

//routes.get('/users/:user_id/techs', TechController.index);
//routes.post('/users/:user_id/techs', TechController.store);
//routes.delete('/users/:user_id/techs', TechController.delete);

//routes.get('/report', ReportController.show);

module.exports = routes;