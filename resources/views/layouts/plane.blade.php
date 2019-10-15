<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
	<title>Web PMS</title>

	<!-- 導入metatag資料 -->
    @include('layouts.metatag_list')

    <!-- 導入css -->
    @include('layouts.css_list')

    <!-- 各頁面各別的CSS匯入 -->
    @yield('put_style')

    <!-- laravel辨識用憑證 -->
    <script type='text/javascript'>
        window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token(),]); ?>
    </script>


</head>

<!-- 身體崁入 -->
@yield('body')

<!-- 導入js -->
@include('layouts.js_list')

<!-- 各頁面各別的JS匯入 -->
@yield('put_script')

</html>