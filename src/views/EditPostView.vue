<template>
    <div id="edit-post">
        <h3>Edit Post</h3>
        <div v-if="!displaySpinner && !loadError && !updateError">
            <form @submit.prevent="saveChanges()">
                <label>Title:</label>
                <input v-model="title" type="text" required/>
                <label>Content:</label>
                <textarea v-model="body" required/>
                <label>Tags:
                    <span class="all-tags" v-for="tag in tags" :key="tag">
                        <span @click="removeTag(tag)">{{tag}}, </span>
                    </span>
                </label>
                <input 
                    v-model="tag" 
                    type="text" 
                    @keydown.enter.prevent="addTag"
                    /> 
                <span class="instructions">**Press enter to add tag. Click on tag to delete. Spaces are removed.</span>
                
                <button>Save Changes</button>
                <div class="process-messages">
                  <div v-if="loadError">
                      <div class="error-message">Error Loading Data<br/>Error Message: {{ loadError }}</div>
                  </div>
                  <div v-if="updateError">
                      <div class="error-message">Error Updating Data<br/>Error Message: {{ updateError }}</div>
                  </div>
                  <div v-if="updateSuccess">
                      <div class="loading-message">Post successfully updated!</div>
                  </div>
                  <div v-if="!loadError && !updateError && !updateSuccess && displaySpinner" > 
                      <div class="loading-message" >{{ spinnerMessage }}</div>
                      <Spinner small="true"/>
                  </div>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script>
import { ref, watch} from 'vue'
import { updateSinglePost } from '@/composables/updateData'
import { fetchSinglePost } from '@/composables/loadData';
import Spinner from '@/components/Spinner.vue';

export default {
    name: 'EditPost',
    props: ['id'],
    components: {Spinner},
    setup(props) {

        const displaySpinner = ref(true)
        const spinnerMessage = ref("Loading . . .")
        const title = ref('')
        const body = ref('')
        const tags = ref([])
        const tag = ref('')

        const fetchPost = fetchSinglePost(props.id)
    
        fetchPost.load()   

        const post = ref(fetchPost.data)
        const loadError = ref(fetchPost.error)

        watch(post, async(newPost, oldPost) => {

            title.value = newPost.title
            body.value = newPost.body
            tags.value = newPost.tags

            displaySpinner.value = false
            
        })

        const addTag = () => {

            if (!tags.value.includes(tag.value)){
                tag.value = tag.value.replace(/\s/,'') // removes all whitespace
                tags.value.push(tag.value)
            }
            tag.value = '';

        }

        const removeTag =(tagValue) => {
            tags.value = tags.value.filter(tag => tag != tagValue)
        }

        const updatePost = updateSinglePost(props.id)
        const updateError = ref(false)
        const updateSuccess = ref(false)

        const saveChanges = () => {

            updateError.value = false
            updateSuccess.value = false
            spinnerMessage.value = "Updating . . ."
            displaySpinner.value = true;

            const data = {
                title: title.value,
                body: body.value,
                tags: tags.value
            }

            updatePost.update(data)
                .then (() => {
                    updateError.value = (ref(updatePost.error)).value
                    updateSuccess.value = (ref(updatePost.success)).value
                    displaySpinner.value = false
                });

            
            
        }

        return {title, body, tag, tags, addTag, removeTag, saveChanges, loadError, updateError, updateSuccess, displaySpinner,spinnerMessage}
    },

   

    
}
</script>

<style>

#edit-post {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin: auto;
}

form {
    background: white;
    padding: 20px;
    margin: 5px;
    border-radius: 10px;
    text-align: left;
}
label {
    display: block;
    color: black;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0
}
input {
    width: 300px;
    padding: 10px;
    border: 0;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}

button {
    display: block;
    margin: 30px auto;
    border: 1px solid silver;
    color: white;
    background-color: green;
    padding: 10px 20px;
    border-radius: 10px;
    text-transform: uppercase;
}

.instructions, .error-message{
    font-size: 14px;
    display: block;
    margin-top: 10px;
    color: red;
    font-style: italic;
}

.loading-message{
    font-size: 14px;
    display: block;
    margin-top: 10px;
    color: green;
    font-style: italic;
}

</style>