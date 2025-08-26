const PartyModel = require("../models/Party");
const { trace } = require("../routes/parties");

const checkPartyBudget = (budget, services) => {
  budget = Number(budget); // garante que é número
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  console.log(priceSum, budget);

  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        return res.status(406).json({ msg: "Orçamento insuficiente" });
      }

      const response = await PartyModel.create(party);
      res.status(201).json({ response, msg: "Festa criada com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();

      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) return res.status(404).json({ msg: "Festa não encontrada" });

      res.json(party);
    } catch (error) {
      console.log("error");
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) return res.status(404).json({ msg: "Festa não encontrada" });

      const deletedParty = await PartyModel.findByIdAndDelete(id);

      res.status(200).json({ deletedParty, msg: "festa excluida com sucesso" });
    } catch (error) {
      console.log("error");
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      // valida orçamento caso tenha services
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        return res.status(406).json({ msg: "Orçamento insuficiente" });
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party, {
        new: true, // retorna o documento atualizado
        runValidators: true, // aplica validações do schema
      });

      if (!updatedParty) {
        return res.status(404).json({ msg: "Não encontrei essa festa" });
      }

      res.status(200).json({ updatedParty, msg: "Atualizado com sucesso" });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ msg: "ID inválido" });
      }
      res.status(500).json({ msg: "Erro interno do servidor" });
      console.log(error);
    }
  },
};

module.exports = partyController;
