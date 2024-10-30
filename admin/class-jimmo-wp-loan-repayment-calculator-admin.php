<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.net-jet.de/
 * @since      1.0.0
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/admin
 * @author     NetJet UG (haftungsbeschränkt) <info@net-jet.de>
 */
class Jimmo_Wp_Loan_Repayment_Calculator_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Prefix for option names.
	 *
	 * @since     1.0.0
	 * @access    private
	 * @var       string     $option_name    The prefix for option names.
	 */ 
	private $option_name = 'jimmo_wp_loan_repayment_calculator';

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/jimmo-wp-loan-repayment-calculator-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/jimmo-wp-loan-repayment-calculator-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Display an action link to our settings page on the plugin page inside wordpress.
	 *
	 * @param array $links
	 * @return void
	 * @since 1.1.0
	 */
	public function add_plugin_action_links( $links ) {
		$links = array_merge(
			array(
				'settings' => '<a href="' . esc_url( admin_url( '/options-general.php?page=jimmo-wp-loan-repayment-calculator' ) ) . '">' . esc_html__( 'Help & Settings', 'jimmo-wp-property-finance-budget-calculator' ) . '</a>'
			), $links
		);
		return $links;
	}

	/**
	 * Add options page under the Settings submenu.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function add_options_page() {
		$this->plugin_screen_hook_suffix = add_options_page(
			__( 'JIMMO WP Loan Repayment Calculator Settings', 'jimmo-wp-loan-repayment-calculator' ),
			__( 'JWP Repayment Calculator', 'jimmo-wp-loan-repayment-calculator' ),
			'manage_options',
			$this->plugin_name,
			array( $this, 'display_options_page' )
		);
	}

	/**
	 * Display the actual options page.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function display_options_page() {
		include_once 'partials/jimmo-wp-loan-repayment-calculator-admin-display.php';
	}

	/**
	 * Register Settings Section for JIMMO TOOLs Credits.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function register_setting() {
		add_settings_section(
			$this->option_name . '_credits',
			__( 'JIMMO TOOLs Credits', 'jimmo-wp-loan-repayment-calculator' ),
			array( $this, $this->option_name . '_credits_cb' ),
			$this->plugin_name
		);

		add_settings_field(
			$this->option_name . '_display_credits',
			__( 'Display credits', 'jimmo-wp-loan-repayment-calculator' ),
			array( $this, $this->option_name . '_display_credits_cb' ),
			$this->plugin_name,
			$this->option_name . '_credits',
			array( 'label_for' => $this->option_name . '_display_credits' )
		);

		register_setting( $this->plugin_name, $this->option_name . '_display_credits', 'boolval' );
	}

	/**
	 * Output the HTML for the Credits Settings Section.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function jimmo_wp_loan_repayment_calculator_credits_cb() {
		echo '<p class="jlr-credits-nag">' . __(
			'Do you want to support our work? Please allow us to show credits and a link back to our homepage below the form on your website.',
			'jimmo-wp-loan-repayment-calculator'
			) . '</p>';
	}

	/**
	 * Output the HTML for the display_credits Settings Option.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function jimmo_wp_loan_repayment_calculator_display_credits_cb() {
		$display_credits = get_option( $this->option_name . '_display_credits' );
		echo '<input type="checkbox" name="' . $this->option_name . '_display_credits' . '" id="' . $this->option_name .
			'_display_credits' . '" value="1" ' . checked( $display_credits, true, false ) . '>';
	}

	/**
	 * Output the activation notice once after the plugin is activated.
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function show_activation_admin_notice() {
		if ( get_transient( 'jimmo_wp_loan_repayment_calculator_activation_notice' ) ) {
			echo '<div class="notice notice-info is-dismissible"><p>';
			printf(
				__(
					'Do you want to support the JIMMO Team? Then go to the <a href="%s">Settings Page</a> to activate our credits.',
					'jimmo-wp-loan-repayment-calculator'
				),
				admin_url( '/options-general.php?page=jimmo-wp-loan-repayment-calculator' )
			);
			echo '</p></div>';
			// delete transient of activation notice
			delete_transient( 'jimmo_wp_loan_repayment_calculator_activation_notice' );
		}
	}

}
