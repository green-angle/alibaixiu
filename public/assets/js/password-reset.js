$('.form-horizontal').on('submit', function() {
    var formData = $(this).serialize()
        // console.log(formData);
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(response) {
            // console.log(response);
            location.href = 'login.html'
        }
    })
    return false;
})