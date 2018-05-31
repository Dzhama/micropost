class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <div class="row">
                        <p class="card-text col-10">${post.body}</p>
                        <a href="#" class="edit card-link" data-id=${post.id}>
                            <i class="fa fa-pencil-alt"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id=${post.id}>
                            <i class="fa fa-trash-alt"></i>
                        </a>
                    </div>  
                </div>
            </div>
            `;
        });

        this.post.innerHTML = output;
    }
    
    showAlert(message, className) {
        //Create div
        const div = document.createElement('div');
        //Add classes
        div.className = className;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get parrent
        const container = document.querySelector('.postContainer');
        //Get posts
        const posts = document.querySelector('#posts');
        //insert alert div
        container.insertBefore(div, posts)

        //set timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = " ";
    }
 
}



export const ui = new UI();