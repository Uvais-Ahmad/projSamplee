{
    //Used to store Comment using AJax
    let createFunction = function(){
        let createComment = $('#comment-form');
        createComment.submit(function ( e ){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : createComment.serialize(),
                success : function(data){
                    console.log(data)
                    let newCmnt = newCommentDom(data.data.comment);
                    //we check which post have this comment
                    let container = data.data.comment.post;
                    $(`#post-comments-${container}`).prepend(newCmnt);

                    
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // Show The comment using AJax
    let newCommentDom = function (comment){
        
        return (
            `  <small>
                    <a href="/comments/destroy/${comment.id}">X</a>
                </small>
            
            <div class="comment">
                <h4>${comment.user}</h4>
                <p>${comment.content}</p>
            </div>`
        );
    }

    createFunction();
}