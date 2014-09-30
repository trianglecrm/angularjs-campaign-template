<?php

include '../../TriangleCRM/Controller.php';

$controller = new Controller("boostrap");

$settings = $controller->GetModel("indexBootstrap");  
$required = $controller->GetModel('billingFormRequired');

?>
<script>
    var indexSettings = <?php echo $settings; ?>;
    var downsell = indexSettings.Result.downSell.split('.')[0];// SPA redirect without .php or .html
    var indexShowEl = <?php echo $required; ?>;
</script>

<div class="" ng-include="templates.templateBill">

</div>
    