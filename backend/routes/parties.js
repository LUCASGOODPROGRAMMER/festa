const router = require("express").Router(); // chamando a router

const partyController = require("../controllers/partyController"); // função do controller

router.route("/parties").post((req, res) => partyController.create(req, res));

router.route("/parties").get((req, res) => partyController.getAll(req, res));

router.route("/parties/:id").get((req, res) => partyController.get(req, res));

router
  .route("/parties/:id")
  .delete((req, res) => partyController.delete(req, res));

router
  .route("/parties/:id")
  .put((req, res) => partyController.update(req, res));
  
module.exports = router;
