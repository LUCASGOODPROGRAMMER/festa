// chamando o model
const { Service: ServiceModel } = require("../models/Service");

const serviceController = {
  // usando create para criar uma função async
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name, // req.body vem todo o corpo da requisição
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: "Serviço criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  }, // req(requisição) e res(resposta)
  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ msg: "serviço não encontrado :(" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ msg: "erro interno do servidor" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ msg: "Serviço não encontrado :(" });
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id);
      res.status(200).json({ deletedService, msg: "Serviço foi excluído" });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ msg: "ID inválido" });
      }
      res.status(500).json({ msg: "Erro interno do servidor" });
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id

      const service = {
        name: req.body.name, // req.body vem todo o corpo da requisição
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updateService = await ServiceModel.findByIdAndUpdate(id, service)
      
      if (!updateService) {
        return res.status(404).json({ msg: "Serviço não encontrado :(" });
      }

      res.status(200).json({service, msg: "dados atualizado!"})
      
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ msg: "ID inválido" });
      }
      res.status(500).json({ msg: "Erro interno do servidor" });
      console.log(error);
    }
  }
}; // objeto chamado serviceController

module.exports = serviceController; // exportando objeto
