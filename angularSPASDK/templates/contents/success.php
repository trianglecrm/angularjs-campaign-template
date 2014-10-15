<?php

include '../../TriangleCRM/Controller.php';

$controller = new Controller("boostrap");

$settings = $controller->GetModel("indexBootstrap");  

?>
<script>
    var indexSettings = <?php echo $settings; ?>;
    var downsell = indexSettings.Result.downSell.split('.')[0];// SPA redirect without .php or .html
    var pageId = 3;
</script>
<p>
        You have already received a receipt of this purchase via email with your order number. Once we ship your item, you will receive another email confirming the shipment along with a tracking number. Should you have any questions about your order, please contact our dedicated support team at 866-396-6046.
</p>
