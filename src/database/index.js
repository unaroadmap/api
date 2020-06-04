const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const State = require('../models/State');
const City = require('../models/City');
const District = require('../models/District');
const Address = require('../models/Address');
const Candidate = require('../models/Candidate');
const Company = require('../models/Company');

const connection = new Sequelize(dbConfig);

User.init(connection);
State.init(connection);
City.init(connection);
District.init(connection);
Address.init(connection);
Candidate.init(connection);
Company.init(connection);

User.associate(connection.models);
State.associate(connection.models);
City.associate(connection.models);
District.associate(connection.models);
Address.associate(connection.models);
Candidate.associate(connection.models);
Company.associate(connection.models);
module.exports = connection;