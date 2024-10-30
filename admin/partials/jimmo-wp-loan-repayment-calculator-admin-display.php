<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://www.net-jet.de/
 * @since      1.0.0
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/admin/partials
 */
?>

<div class="wrap">
	<h2><?php esc_html_e( get_admin_page_title(), 'jimmo-wp-loan-repayment-calculator' ); ?></h2>

	<?php include 'jimmo-wp-loan-repayment-calculator-welcome-box.php';  ?>

	<form action="options.php" method="post">
		<?php
			settings_fields( $this->plugin_name );
			do_settings_sections( $this->plugin_name );
			submit_button();
		?>
	</form>
</div>