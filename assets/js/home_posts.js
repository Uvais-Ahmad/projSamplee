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
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function(post){
        //here we return While Page of '_post.ejs'
        $('#content').val('');
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
            console.log('eVENET CALLED FOR DELETELINK ');
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    console.log('delete Req Using AJAX : ',data.data);
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }



    createPost();
}