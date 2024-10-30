<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://www.net-jet.de/
 * @since      1.0.0
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/includes
 * @author     NetJet UG (haftungsbeschränkt) <info@net-jet.de>
 */
class Jimmo_Wp_Loan_Repayment_Calculator_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'jimmo-wp-loan-repayment-calculator',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}

	/**
	 * Unload the plugin text domain for translation.
	 * 
	 * Used for changing the locale after it was first loaded.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function unload_plugin_textdomain() {
		unload_textdomain( 'jimmo-wp-loan-repayment-calculator' );
	}

	/**
	 * Change locale and reload text domain.
	 *
	 * @param string $locale language string
	 * @return void
	 * @since 1.0.0
	 */
	public function change_locale( $locale ) {
		// Change locale
		add_filter( 'locale', function( $lang ) use ( $locale ) { return $locale; } );

		$this->unload_plugin_textdomain();
		$this->load_plugin_textdomain();
	}

}
