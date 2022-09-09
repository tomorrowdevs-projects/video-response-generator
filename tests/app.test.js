const request = require('supertest');
const app = require('../app');
// FUNCTIONS TO TEST
const {
    formParser,
    playlistGenerator,
    recursiveParser,
} = require('../controllers/postFormController');

// TEST HELPERS
const {
    expectedDataAfterParser,
    expectedPlaylistAfterGenerator,
    fakeNestedObject,
    fakeParsedDataForRecursive,
} = require('./tests_utils/testsHelpers');

// Unit tests for parsing raw data and generating playlist
describe('RAW PARSER TEST', () => {
    it('Should return an object with variable "keys" as keys and variables "text" as values from rawData', () => {
        const rawData = require('../test-results.json');
        const variablesArr = rawData.form_response.variables;
        expect(formParser(variablesArr)).toEqual(expectedDataAfterParser);
    });
});
describe('PLAYLIST GENERATOR TEST', () => {
    it('Should return an array aka playlist with videos names referring to the results array', () => {
        const parsedData = expectedDataAfterParser;
        expect(playlistGenerator(parsedData)).toEqual(
            expectedPlaylistAfterGenerator
        );
    });
});
describe('RECURSIVE PARSER TEST', () => {
    it('Should return a string with video name', () => {
        const parsedData = expectedDataAfterParser;
        expect(
            recursiveParser(fakeNestedObject, fakeParsedDataForRecursive)
        ).toEqual('correct_video');
    });
});

// INTEGRATION TEST OF THE POST ENDPOINT
describe('POST ENDPOINT INTEGRATION TEST', () => {
    it('Should return a json with the final playlist of videos', async () => {
        const response = await request(app).post('/').send();
        expect(response.body).toEqual(expectedPlaylistAfterGenerator);
    });
});
