<?php

/**
 * Displays a welcome box on the plugin admin page.
 *
 * This file contains some help and a link to out plugin ratings page in the WprdPress plugin directory.
 *
 * @link       http://www.net-jet.de/
 * @since      1.1.0
 *
 * @package    Jimmo_WP_Loan_Repayment_Calculator
 * @subpackage Jimmo_WP_Loan_Repayment_Calculator/admin/partials
 */
?>

<div id="welcome-box" class="welcome-box">
    <div class="welcome-box-column">
        <h3 class="welcome-box-heading dashicons-before dashicons-editor-help h-icon"><?php esc_html_e( 'How to display the Repayment Calculator', 'jimmo-wp-loan-repayment-calculator' ); ?></h3>
        <h3><?php esc_html_e( 'Use our shortcode', 'jimmo-wp-loan-repayment-calculator' ); ?></h3>
        <ol>
            <li><?php esc_html_e( 'Open any post, page or other part of your website in the editor.', 'jimmo-wp-loan-repayment-calculator' ); ?></li>
            <li><?php
            printf(
                __( 'Enter the shortcode %s where you want the calculator to show up.', 'jimmo-wp-loan-repayment-calculator' ),
                '<code>[jw-repayment-calculator]</code>'
            ); ?></li>

            <li><?php esc_html_e( 'Load the page or post in the frontend and check the calculator is displayed in the way you want it to.', 'jimmo-wp-loan-repayment-calculator' ); ?></li>
        </ol>
    </div>
    <div class="welcome-box-column love">
        <h3 class="welcome-box-heading dashicons-before dashicons-heart h-icon we-love"><?php esc_html_e( 'We love you and our plugins!', 'jimmo-wp-loan-repayment-calculator' ); ?></h3>
        <p><?php esc_html_e( 'If you love us and our plugin, too, we would love you to spread the word by giving us a 5 star rating in the WordPress plugin directory.', 'jimmo-wp-loan-repayment-calculator' ); ?></p>			
        <a href="https://wordpress.org/support/plugin/jimmo-wp-loan-repayment-calculator/reviews/" target="_blank" class="button button-primary cta-button"><?php esc_html_e( 'I love you and your plugin, too!', 'jimmo-wp-loan-repayment-calculator' ); ?></a>
        <p><?php
            printf(
                __( 'If you have any questions regarding the plugin, want to customize parts of the form, or have any suggestions or comments, please feel free to <a href="%s" target="_blank">contact us</a>!', 'jimmo-wp-loan-repayment-calculator' ),
                esc_url( 'http://www.net-jet.de/impressum/' )
            );
        ?></p>
    </div>
</div>