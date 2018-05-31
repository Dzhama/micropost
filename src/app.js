// import file 
import { http } from "./http";
import { ui } from "./ui";


//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


//Get posts
function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

//Submit Post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

   //Validate input
    if(title === '' && body === '') {
        // Show alert if input is empty
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
        
    }else {

        const data = {
            title,
            body
        }
            // Check for id
        if (id === '') {
            // Create Post
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post added', "alert alert-success");
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err))
        } else {
            // Create Post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post updated', "alert alert-success");
                    ui.changeFormState('add');
                    getPosts();
                    console.log(data)
                })
                .catch(err => console.log(err))
        }
       
    }
}

//Delete posts
function deletePost(e) {

    //Check if delete button clicked
    if(e.target.parentElement.classList.contains('delete')){
        //Geting current element id
        const id = e.target.parentElement.dataset.id;
        // Delete post
        http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post deleted', 'alert alert-danger');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
    }

    e.preventDefault();
} 

//Enable Edit State
function enableEdit(e) {
    //Check if delete button clicked
    if (e.target.parentElement.classList.contains('edit')) {
        //Geting current element id
        const id = e.target.parentElement.dataset.id;
        //Get title value
        const title = e.target.parentElement.parentElement.previousElementSibling.textContent;
        //Geting body value
        const body = e.target.parentElement.previousElementSibling.textContent;

        //storing it in data object
        const data = {
            id,
            title,
            body
        }

        //Fill form input with current post
        ui.fillForm(data)
       
    }

    e.preventDefault();
}

//Cancel Edit State
function cancelEdit (e) {
    if(e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    e.preventDefault();
}