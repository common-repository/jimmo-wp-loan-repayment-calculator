<?php

/**
 * Fired during plugin activation
 *
 * @link       http://www.net-jet.de/
 * @since      1.0.0
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/includes
 * @author     NetJet UG (haftungsbeschränkt) <info@net-jet.de>
 */
class Jimmo_Wp_Loan_Repayment_Calculator_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		set_transient( 'jimmo_wp_loan_repayment_calculator_activation_notice', true );
	}

}
