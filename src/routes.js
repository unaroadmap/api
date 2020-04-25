const routes = require("express").Router();

routes.get("/", (req, res) => {
    return res.json({ hello: "Una RoadMap" });
});

module.exports = routes;