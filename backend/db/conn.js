const mongoose = require("mongoose"); // importan uma biblioteca do node.js para trabalhar com MongoDb de forma mais simples

async function main() {
  try {
    mongoose.set("strictQuery", true); // usado para evitar processos inexistentes, como uma consulta em um campo que não existe

    await mongoose.connect(
      "mongodb+srv://lucas:H4ky5v8VKFPuXs2S@cluster0.gp6mnwi.mongodb.net/"
    );
    // H4ky5v8VKFPuXs2S
    console.log("estou conectado ao banco");
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;
