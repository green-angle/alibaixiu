$('#fenlei').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false;
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('fenleiTpl', { data: response })
        $('#fenleiTbody').html(html)
    }
})
$('#fenleiTbody').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            var html = template('fenlei-change', response)
            $('#fenleiBox').html(html)
        }
    });
})
$('#fenleiBox').on('submit', '#change', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(response) {
            location.reload()
        }
    });
    return false;
})
$('#fenleiTbody').on('click', '.flDel', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function(response) {
            location.reload()
        }
    });
})