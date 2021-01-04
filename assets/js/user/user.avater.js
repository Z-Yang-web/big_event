$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        // 点击上传按钮模拟用户点击行为
    $('#up_btn').on('click', function() {
            // 运行程序模拟文件域的点击事件
            $('#file').click()
        })
        // 为图片选择按钮绑定change事件
    $('#file').on('change', function(e) {
            // console.log(e);用户选择的文件可以通过事件对象e获取
            var fileList = e.target.files
                // console.log(fileList);
            if (fileList.length === 0) {
                return layer.msg('你未选择要上传的照片')
            }
            // 1. 拿到用户选择的文件
            var file = e.target.files[0]
                // 2. 将文件，转化为路径
            var imgURL = URL.createObjectURL(file)
                // 3. 重新初始化裁剪区域
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', imgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 为确定按钮绑定点击事件
    $('#confirm_btn').on('click', function() {
        // console.log("ok");
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 拿到用户裁剪过后的头像   
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserinfo()
            }
        });
    })
})