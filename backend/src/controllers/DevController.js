const axios = require('../../node_modules/axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessagem } = require('../websocket');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async show(request, response) {
        const dev = await Dev.findById(request.params.id);
        return response.json(dev);
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessagem(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.status(201).json(dev);
    },

    async update(request, response) {

        const dev = await Dev.findByIdAndUpdate(request.params.id, request.body, { new: true });

        if (dev) {
            return response.json(dev);
        }
        else {
            return response.status(404).send();
        }
    },

    async destroy(request, response) {
        const dev = await Dev.findByIdAndRemove(request.params.id);
        return response.send('');
    }
};