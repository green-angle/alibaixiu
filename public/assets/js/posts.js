$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        
        var html=template('postsTpl',response)
        $('#postsTbody').html(html)
        
    }
});