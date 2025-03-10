<template>
    <div id="create-post">
        <h3>Create New Post</h3>
        <div class="process-messages">
            <div v-if="error">
                <div class="error-message">Error Creating Data<br/>Error Message: {{ error }}</div>
            </div>
            <div v-if="!error && displaySpinner">
                <div class="loading-message" >{{ spinnerMessage }}</div> 
                <Spinner small="true"/>
            </div>
        </div>
        <div v-if="!displaySpinner && !error" >
            <form @submit.prevent="addNewPost()">
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
                <button>Add New Post</button>
                <div v-if="error">
                    <div class="error-message">Error Loading Data</div>
                    <div class="error-message">Error Message: {{ error }}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref} from 'vue'
import { useRouter } from 'vue-router'
import { addPost } from '@/composables/updateData'
import Spinner from '@/components/Spinner.vue';

export default {
    name: 'AddNewPost',
    components: {Spinner},
    setup() {
        const title = ref('')
        const body = ref('')
        const tag = ref('')
        const tags = ref([])

        const displaySpinner = ref(false)
        const router = useRouter();
        
        const addTag = () => {

            if (!tags.value.includes(tag.value)){
                tag.value = tag.value.replace(/\s/,'') // removes all whitespace
                tags.value.push(tag.value.toUpperCase())
            }
            tag.value = '';

        }

        const removeTag =(tagValue) => {
            tags.value = tags.value.filter(tag => tag != tagValue)
        }

        const {success, error, update} = addPost()

        const addNewPost = () => {

            displaySpinner.value = true;

            const newPost = {
                title: title.value,
                body: body.value,
                tags: tags.value,
                date: new Date()
            }

            update(newPost)
                .then (() => {
                    if(success.value)
                        router.push("/")
                });
            
        }

        return {title, body, tag, tags, addTag, removeTag, addNewPost, error, success, displaySpinner}
    },

   

    
}
</script>

<style>

#create-post {
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