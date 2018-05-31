// import file 
import { http } from "./http";
import { ui } from "./ui";


//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);


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
    if(title !== '' && body !== '') {
        const data = {
            title,
            body
        }

        // Create post 
        http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', "alert alert-success");
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err))
    }
}

//Delete posts
function deletePost(e) {

    //Check if delete button clicked
    if(e.target.parentNode.classList.contains('delete')){

        //Geting current element id
        const id = e.target.parentElement.dataset.id;
        
        // Delete post
        http.delete(`http://localhost:3000/posts/${id}`)

            .then(data => {
                ui.showAlert('Post deleted', 'alert alert-success')
                getPosts();
            })
            .catch(err => console.log(err));
    }

    e.preventDefault();
} 