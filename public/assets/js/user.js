$('#userForm').on('submit', function() {
    //获取表单中输入的值，转为参数字符串
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function(response) {
            location.reload()
        },
        error: function() {
            alert('添加失败')
        }
    });
    return false;
})


$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('pic', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // console.log(response);
            $('#preview').attr('src', response[0].pic)
            $('#hiddenAvatar').val(response[0].pic)
        },
        error: function() {
            alert('图片上传失败')
        }
    });
})

$.ajax({
    type: "get",
    url: "/users",
    // data: formData,
    success: function(response) {
        var html = template('usersPel', { data: response })
            // console.log(html);
        $('#tbody').html(html)
    }
});
$('#tbody').delegate('.edit', 'click', function() {
    var id = $(this).attr('data-id')
        // console.log(id);
        //根据id获取用户信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function(response) {
            var html = template('changeTpl', response);
            $('#modifyBox').html(html)
        }
    })
})
$('#modifyBox').on('submit', '#userForm', function() {
    var formData = $(this).serialize()
        // console.log(formData);
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        // dataType: "dataType",
        success: function(response) {
            location.reload()
        },
        error: function() {
            alert('修改错误')
        }
    });
    return false
})
$('#tbody').on('click', '.del', function() {
    var del = confirm('您确定要删除吗');
    var id = $(this).attr('data-id');
    if (del) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})

$('.header-checkbox').on('change', function() {
    var hck = $(this).prop('checked')
    $('#tbody').find('input').prop('checked', hck)
    if (hck) {
        $('.all-del').show()
    } else {
        $('.all-del').hide()
    }
})
$('#tbody').on('change', '.body-checkbox', function() {
    var tbody = $('#tbody').find('input')
    if (tbody.length == tbody.filter(':checked').length) {
        $('.header-checkbox').prop('checked', 'checked')
    } else {
        $('.header-checkbox').prop('checked', false)
    }
    if (tbody.length > 0) {
        $('.all-del').show()
    } else {
        $('.all-del').hide()
    }
})
$('.all-del').on('click', function() {
    var ids = [];
    var checks = $('#tbody').find('input').filter(':checked')
    checks.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('您确定要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }
})