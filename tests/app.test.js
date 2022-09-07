const request = require('supertest');
const app = require('../server');
const {
    formParser,
    playlistGenerator,
} = require('../controllers/postFormController');
const {
    expectedDataAfterParser,
    expectedPlaylistAfterParsedData,
} = require('./tests_utils/parserHelpers');

// Unit tests for parsing raw data and generating playlist
describe('RAW PARSER TEST', () => {
    it('Should return an object with variable "keys" as keys and variables "text" as values from rawData', () => {
        const rawData = require('../test-results.json');
        const variablesArr = rawData.form_response.variables;
        expect(formParser(variablesArr)).toEqual(expectedDataAfterParser);
    });
});
describe('PLAYLIST GENERATOR TEST', () => {
    it('Should return an array with videos names referring to the results array located in utils/testVideoResults.js', () => {
        const parsedData = expectedDataAfterParser;
        expect(playlistGenerator(parsedData)).toEqual(
            expectedPlaylistAfterParsedData
        );
    });
});

// INTEGRATION TEST OF THE POST ENDPOINT
describe('POST ENDPOINT INTEGRATION TEST', () => {
    it('Should return a json with the final playlist of videos', async () => {
        const response = await request(app).post('/').send();
        expect(response.body).toEqual(expectedPlaylistAfterParsedData);
    });
});
