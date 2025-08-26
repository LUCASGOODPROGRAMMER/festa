const router = require("express").Router(); // importando o router

// Services router
const servicesRouter = require("./services"); // rota

router.use("/", servicesRouter); // todas as rotas a partir de "/"

module.exports = router; // exportando o router
