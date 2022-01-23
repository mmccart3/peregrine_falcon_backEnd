const Stage = require("../models/stages");
const Location = require("../models/locations");
const Stage2location = require("../models/stages2locations")
const Location2privateAccomm = require("../models/location2privateAccomm");
const PrivateAccommDetail = require("../models/privateAccommDetail");
const Location2albergues = require("../models/location2albergues");
const Albergue = require("../models/albergue");
const Paragraph = require("../models/paragraphs");

exports.getStageData = async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send(`you are not logged in`);
        } else {
            const stageData = await Stage.findAll(
            {
                include:{
                    model: Stage2location,
                    as: 'stages2locations',
                    required: true
                },
                include:{
                    model: Location,
                    as: 'Locations',
                    required: true
                }
                }
            );
            res.status(200).send({stageData});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
};

exports.getLocationData = async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send(`you are not logged in`);
        } else {
            const locationPrivateData = await Location.findAll(
            {   
                include:{
                    model: PrivateAccommDetail,
                    as: 'fred',
                    required: false
                }
            }
            );
            const locationAlbergueData = await Location.findAll(
                {
                    include:{
                        model: Albergue,
                        as: 'fredalbergue',
                        required: false
                    }
                }
                );
                const locationParagraphs = await Location.findAll(
                    {
                        include:{
                            model: Paragraph,
                            as: 'paragraphs',
                            required: false
                        }
                    }
                    );

            const locationData =
            {
                locationPrivateData
                ,
                locationAlbergueData
                ,
                locationParagraphs    
            };
            res.status(200).send({locationData});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
};