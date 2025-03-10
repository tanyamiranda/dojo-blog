import {ref} from 'vue' 
const URI_POSTS_JSON = "http://localhost:2222/posts";

const getData = (uri) => {
    const data = ref([])
    const error = ref(null)

    const load = async() => {
        try {
            console.log("Fetching data " + uri)
            const response = await fetch(uri);
            data.value = await response.json();

        } catch (err) {
            error.value = err.message 
            console.error("Error fetching or parsing JSON", uri);
            console.error(err);
        }
    }

    return {data, error, load}
}

export const getPosts = () => {
    return getData(URI_POSTS_JSON)
}