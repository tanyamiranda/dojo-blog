import {ref} from 'vue'

const URI_POSTS_JSON = "http://localhost:2222/posts";

// This requires the local jason server to be running.
const fetchData = (uri) => {
    const data = ref([])
    const error = ref(null)

    const load = async() => {
        try {

            delayCall();

            //console.log("Loading data from " + uri)
            const response = await fetch(uri)
            data.value = await response.json()
        } 
        catch (err) {
            error.value = err.message
            console.error("Error fetching or parsing JSON", uri)
            console.error(err.message)
        }
    }

    //Simulate Delay for testing features
    const delayCall = () => {
        //await new Promise (resolve => {
        //    setTimeout(resolve, 2000)
        //})
    }

    return {data, error, load}
}  

export const fetchAllPosts = () => {
    return fetchData(URI_POSTS_JSON)
}

export const fetchSinglePost = (taskId) => {
    return fetchData(URI_POSTS_JSON + "/" + taskId)
}
