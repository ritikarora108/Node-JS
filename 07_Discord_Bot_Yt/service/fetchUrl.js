import axios from "axios";

async function handleFetchURLCommand(content) {

    const shortId = content.split(' ')[1];
    try {
        // fetch 22b34b
        if (!shortId) {
            return 'Please provide a valid shortId.';
        }
        const response = await axios.get(`http://localhost:8000/url/${shortId}`);
        const url = response.data?.url;
        if (url) {
            return `The original URL for ${shortId} is: ${url}`;
        } else {
            return `No URL found for shortId: ${shortId}`;
        }
    } catch (error) {
        console.log(error);
        return `No URL found for shortId: ${shortId}`;
    }
}

export default handleFetchURLCommand;