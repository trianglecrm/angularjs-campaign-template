<?php

include '../../TriangleCRM/Controller.php';

$controller = new Controller("boostrap");

$settings = $controller->GetModel("orderBootstrap");  
$required = $controller->GetModel('ccFormRequired');
?>

<script>
    var orderSettings = <?php echo $settings; ?>;
    var downsell = orderSettings.Result.downSell.split('.')[0];// SPA redirect without .php or .html
    var orderShowEl = <?php echo $required; ?>;
</script>

<div class="" ng-include="templates.templateCC">

</div>