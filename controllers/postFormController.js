const rawData = require('../test-results.json');
const { sequence, results } = require('../utils/testVideoResults');

// this function will return only the array contained in the raw form from typeform
const formParser = (rawForm) => {
    // first we get the variables array from the request
    const variablesArr = rawForm.form_response.variables;

    // then we transform the variables array into a key:value object like this {variable.key: variable.text}
    const variablesObj = variablesArr.reduce(
        (obj, variable) =>
            Object.assign(
                obj,
                // if variable type is equal to text we assign the key value pair to the variablesObject
                // because it could be a number or other
                variable.type === 'text' && { [variable.key]: variable.text }
            ),
        {}
    );
    return variablesObj;
};

const playlistGenerator = (parsedData) => {
    // this is the playlist of videos that will be generates
    const playlist = [];
    // an array used in development to see how the function works
    const sampleLog = [];

    // first we iterate over the sequence elements so we have the correct order for videos
    // sequence elements will be "b2b", "motivation", "need_basics"
    for (const element of sequence) {
        const variableValue = parsedData[element]; // this contains values like FUTURE or FALSE

        // if variableValue is not an empty string we can push the resulting video to the playlist
        if (variableValue) {
            // element video will have the corresponding video link or number
            const elementVideo = results[element][variableValue];
            if (elementVideo) {
                sampleLog.push(`${element} ==>  ${elementVideo}`);
                playlist.push(elementVideo);
            }
        }
    }
    console.log('sample Log with corresponding video:', sampleLog);
    return playlist;
};

// @POST
// this is the controller that will be called when raw form will be posted to the backend
const postFormController = (req, res) => {
    // TODO: we have still to figure if rawData will be sent as a file or as a json and then parse raw data from request

    // parsedData contains an object with variables "keys" as keys and variables "text" as values
    const parsedData = formParser(rawData);
    console.log('parsed from rawData: ', parsedData);

    const generatedPlaylist = playlistGenerator(parsedData);
    console.log('Video playlist: ', generatedPlaylist);

    return res.json(generatedPlaylist);
};

module.exports = { postFormController, formParser, playlistGenerator };
