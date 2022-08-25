{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                //    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('.post-container').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function(post){

        //here we return While Page of '_post.ejs'
        return(
            `<div class="post" id="post-${post._id}">
                <--Thsi si Me -->
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
            
            <h3 id="cont">
                ${post.content}<br>
            </h3>

            <h4 id="user">
                ${post.user.name}<br>
            </h4>

            <div id="comment-container">
                <h1 id="tag">Comments :</h1>
                <div class="post-comments-list" id="post-comments-${post._id}">
                     
                </div>
            </div>
            
                <form action="/comments/create" method="POST" id="comment-form">
                    <input type="text" id="content" name="content" placeholder="Add a comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Post" id="comment-btn">
                </form>
        </div>`
        )
    }



    createPost();
}