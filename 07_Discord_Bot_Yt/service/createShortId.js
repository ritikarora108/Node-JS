import axios from "axios";

async function handleCreateShortIdCommand(content) {
    try {
        // create https://google.com/
        const url = content.split("create ")[1];
        if (url.startsWith('http://') || url.startsWith('https://')) {
            const response = await axios.post('http://localhost:8000/url/', { url: url });
            const { shortId } = response.data;
            if (shortId) {
                const msg = `Here is your shortId: ${shortId}`;
                return msg;
            } else {
                return 'Failed to generate a shortId. Please try again later.';
            }
        } else {
            return 'Invalid URL';
        }
    } catch (error) {
        console.error("Error in handleCreateShortIdCommand:", error);
        return 'An error occurred while processing your request. Please try again.';
    }
}

export default handleCreateShortIdCommand;