const rawData = require('../test-results.json');
const { sequence, results } = require('../utils/testVideoResults');

// this function will return the variables contained in the raw form from typeform as an object
const formParser = (variablesArr) => {
    // we transform the variables array into a key:value object like this {variable.key: variable.text}
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
        const missingElementsInResults = [];
        const variableValue = parsedData[element]; // this contains values like FUTURE or FALSE

        // if variableValue is not an empty string, there is a value associated to the variable
        // ex: b2b has value TRUE
        // if variableValue string is empty we don't have value associated to the variable key
        // ex: field_complexity ""
        if (variableValue) {
            let elementVideo = null;

            // at this point we try to get the corresponding video, defined in the results array, for the variable value. We assume that variableValue will always have a value associated in the results object otherwise we will catch the error when try to accessing the value
            try {
                elementVideo = results[element][variableValue];
            } catch (err) {
                // if we don't find a corresponding element in the results array we add the sequence element in the missingElementsInResults array
                console.log(
                    `Missing corresponding video in results object for ${element}: ${parsedData[element]}`
                );
                missingElementsInResults.push(parsedData[element]);
            }
            // if elementVideo is a string we know it isn't a nested element so we can push the
            // corresponding video number to the playlist
            if (elementVideo && typeof elementVideo === 'string') {
                sampleLog.push(`${element} ==>  ${elementVideo}`);
                playlist.push(elementVideo);
            }
            // instead if it's an object we know that has nested properties inside
            // and we try to find the corresponding value in parsedData
            else if (elementVideo && typeof elementVideo === 'object') {
                console.log('Finded nested object: ', elementVideo);
                // first we iterate over the parsedData object
                for (const key in parsedData) {
                    // if we find the corresponding key in parsedData we have a match with the elementVideo object
                    if (key === Object.keys(elementVideo)[0]) {
                        console.log(
                            `Match found for nested object in parsedData for ${key}:${parsedData[key]}`
                        );
                        // parsedValue has the value of the key that matches in parsedData
                        const parsedValue = parsedData[key];
                        // now if parsedValue is not an empty string we can access at the corresponding video in the results object
                        const resultingVideo = elementVideo[key][parsedValue];
                        if (parsedValue && resultingVideo) {
                            // after we have checked that resultingVideo has a value we push it to the playlist
                            playlist.push(resultingVideo);
                            sampleLog.push(`${element} ==>  ${resultingVideo}`);
                        }
                    }
                }
            }
        }
    }
    console.log('sample Log with corresponding video:', sampleLog);
    return playlist;
};

// @POST
// this is the controller that will be called when raw form will be posted to the backend
const postFormController = (req, res) => {
    // at the moment we are getting rawForm from a file, but it will be sent in the request.body
    const rawForm = req.body?.form ? req.body.form : rawData;
    // first we get the variables array from the request
    const variablesArr = rawForm.form_response.variables;
    // parsedData contains an object with variables "keys" as keys and variables "text" as values
    const parsedData = formParser(variablesArr);
    console.log('parsed from rawData: ', parsedData);

    const generatedPlaylist = playlistGenerator(parsedData);
    // console.log('Video playlist: ', generatedPlaylist);

    return res.json(generatedPlaylist);
};

module.exports = { postFormController, formParser, playlistGenerator };
