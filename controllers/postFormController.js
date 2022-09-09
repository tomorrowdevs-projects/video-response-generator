const rawData = require('../test-results.json');
const { sequence, results } = require('../utils/testVideoResults');

// this is the function that in nested objects searches for resulting video
const recursiveParser = (originalObj, parsedData) => {
    // first we save the inner level name in innerElement variable
    const innerElement = Object.keys(originalObj)[0];
    // console.log('Inner Element in nested obj: ', innerElement);
    // then we search wich direction we have to go by searching for user response for the inner level question in the parsedData obj
    const userRespForInnerEl = parsedData[innerElement];
    // console.log('User response for', innerElement, ' is: ', userRespForInnerEl);
    // now we have to access the nested level using the userRespForInnerEl
    // if the nested level is a string we have found the video
    // else we continue going inside the nested obj with recursion
    if (typeof originalObj[innerElement][userRespForInnerEl] === 'string') {
        // if we found a string we have arrived to the last level of the nested object, in the string it is stored the video number/link so we can return it and it will be added to the playlist
        return originalObj[innerElement][userRespForInnerEl];
    } else {
        // if it's not a string we aren't arrived to the last level of the nested object so we continue with recursion
        return recursiveParser(
            originalObj[innerElement][userRespForInnerEl],
            parsedData
        );
    }
};

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
            if (results[element]) {
                elementVideo = results[element][variableValue];
            } else {
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
                const nestedResultingVideo = recursiveParser(
                    elementVideo,
                    parsedData
                );
                playlist.push(nestedResultingVideo);
                sampleLog.push(`${element} ==>  ${nestedResultingVideo}`);
            }
        }
    }
    // console.log('sample Log with corresponding video:', sampleLog);
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
    // console.log('parsed from rawData: ', parsedData);

    const generatedPlaylist = playlistGenerator(parsedData);
    // console.log('Video playlist: ', generatedPlaylist);

    return res.json(generatedPlaylist);
};

module.exports = {
    postFormController,
    formParser,
    playlistGenerator,
    recursiveParser,
};
