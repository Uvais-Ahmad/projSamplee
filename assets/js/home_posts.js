{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){

            e.preventDefault();
            $.ajax({
                url: '/posts/create',
                type : 'post',
                data: newPostForm.serialize(),
                success : function(data){
                    console.log("DATA FROM ADDING THE POST : success : ",data);
                    let newPost = newPostDom(data.data.post);
                    $('.post-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    console.log('Post Cerated');
                    new Noty({
                        theme: 'relax',
                        text: "Post published!", 
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                complete : function(){
                    console.log(" Post creaated successfully ")
                }
                ,error: function(error){
                    console.log(error.responseText);
                }
            });

            
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        //here we return While Page of '_post.ejs'
        $('#content').val('');
        console.log("New Post call on home loading")
        return(
            `<div class="post" id="post-${post._id}">
                
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
            
                <form action="/comments/create" method="POST" class="comment-form" id="post-${ post._id }-comments-form">
                    <input type="text" id="content" name="content" placeholder="Add a comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Post" id="comment-btn">
                </form>
        </div>`
        )
    }


    //Method to delete a post in DOM

    let deletePost = function(deleteLink){
        
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log('EVENT CALLED FOR DELETELINK ');
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                    convertPostsToAjax();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time)
    // and call the delete post method on delete link of each, also add AJAX 
    //(using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        console.log('Inne cinver to ajax');
        $('.post-container>.post').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            console.log('Yes called for whole and this : ',self);
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            console.log('This is PostId : ',postId);
            new PostComments(postId);
        });

    }



    createPost();
    convertPostsToAjax();
}