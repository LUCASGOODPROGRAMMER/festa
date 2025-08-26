const router = require("express").Router(); // importando o router

// Services router
const servicesRouter = require("./services"); // rota

router.use("/", servicesRouter); // todas as rotas de service a partir de "/"

// Parties routes
const partyRouter = require("./parties")

router.use("/", partyRouter);

module.exports = router; // exportando o router
