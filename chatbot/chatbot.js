const dialogflow = require('@google-cloud/dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const path = require('path');

const projectID = config.googleProjectID;

const credentials = {
    client_email : config.googleClientEmail,
    private_key : config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({
  
    projectID ,
    credentials

});

const sessionPath = sessionClient.projectAgentSessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = {
    textQuery: async function(text, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request); 
        responses = await self.handleAction(responses);
        return responses; 
    },

    handleAction: function(responses) {
        return responses;
    },
    eventQuery: async function(event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            }
        };

        let responses = await sessionClient.detectIntent(request); 
        responses = await self.handleAction(responses);
        return responses; 
    }
};
