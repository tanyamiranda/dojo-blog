import {ref} from 'vue'

const URI_POSTS_JSON = "http://localhost:2222/posts";
const FETCH_UPDATE = "PATCH";
const FETCH_ADD = "POST";

const updateData = (uri, updateType) => {
    const error = ref(null)
    const success = ref(null)

    const update = async(data) => {
        try{ 
            
            //Simulate Delay for testing features
            //await new Promise (resolve => {
            //   setTimeout(resolve, 2000)
            //})

            if (data == null) {
                console.log("Data is empty")
                throw "DATA IS EMPTY"
            }                

            console.log("updateData()...")
            console.log("updateType", updateType)
            console.log("uri", uri)
            console.log("data", data)

            const response = await fetch(uri, {
                method: updateType,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            success.value = true
            console.log("response", response)
            
        }   
        catch (err) {
            error.value = err
            console.error("Error fetching or parsing JSON", uri)
            console.error(err.message)
        } 
    }    

    return {error, success, update}
}



export const addPost = () => {
    return updateData(URI_POSTS_JSON, FETCH_ADD)
}

export const updateSinglePost = (postId) => {
    return updateData(URI_POSTS_JSON + "/" + postId, FETCH_UPDATE)
}
