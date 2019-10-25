$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) { 
        var html=template('postsTpl',response)
        $('#postsTbody').html(html)
        var pages=template('pageTpl',response)
        $('#pages').html(pages)
    }
});
function formateDate(date){
    date=new Date(date);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}
function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:page
        },
        success: function (response) { 
            var html=template('postsTpl',response)
            $('#postsTbody').html(html)
            var pages=template('pageTpl',response)
            $('#pages').html(pages)
        }
    });
}

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response);
        var html=template('fenleiTpl',{data:response})
       $('#fenlei').html(html)
    }
});
$('#shaixuanForm').on('submit',function(){
    // alert(1)
    var formData=$(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data:formData,
        success: function (response) { 
            var html=template('postsTpl',response)
            $('#postsTbody').html(html)
            var pages=template('pageTpl',response)
            $('#pages').html(pages)
        }
    });
    return false;
})