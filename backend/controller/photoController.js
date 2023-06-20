const joi = require('joi');
const fs = require('fs');
const Photo = require('../models/photo');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const { BACKEND_SERVER_PATH, API_KEY } = require('../config/index');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const photoController = {
  async addphoto(req, res, next) {
    const photoSchema = joi.object({
      photo: joi.string().required()
    });
    const { error } = photoSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { photo } = req.body;
    // read buffer
    const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
    // allocate random name
    const imagePath = `${Date.now()}-${author}.png`;

    // save locally
    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // Perform OpenAI image variation logic
    try {
        const response = await openai.createImageVariation(
          fs.createReadStream(`storage/${imagePath}`),
          2,
          "1024x1024"
        );
        // Handle the response as needed
        console.log(response);
  
        // Send the response data to the client
        res.status(200).json({ response });
      } catch (error) {
        // Handle error from OpenAI API
        console.error(error);
        // Send the error to the client
        res.status(500).json({ error: 'An error occurred while processing the image variation.' });
      }
    }
  }; module.exports=photoController;