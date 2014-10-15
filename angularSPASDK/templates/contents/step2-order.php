<?php

include '../../TriangleCRM/Controller.php';

$controller = new Controller("boostrap");

$settings = $controller->GetModel("upsellBootstrap");  
$required = $controller->GetModel('ccFormRequired');
?>

<script>
    var orderSettings = <?php echo $settings; ?>;
    var downsell = orderSettings.Result.downSell.split('.')[0];// SPA redirect without .php or .html
    var orderShowEl = <?php echo $required; ?>;
    var pageId = 2;
</script>

<h1>Upsell</h1>
<div class="" ng-include="templates.templateCC">

</div>
