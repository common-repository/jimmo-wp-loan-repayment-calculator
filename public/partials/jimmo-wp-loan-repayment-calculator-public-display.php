<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.net-jet.de/
 * @since      1.0.0
 *
 * @package    Jimmo_Wp_Loan_Repayment_Calculator
 * @subpackage Jimmo_Wp_Loan_Repayment_Calculator/public/partials
 */
?>

<div class="jl-repayment-widget">
    <header>
        <h2><?php esc_html_e( 'Loan Repayment Calculator', 'jimmo-wp-loan-repayment-calculator' ); ?></h2>
        <div class="jl-statusbar">
            <div class="jl-statusbar-progress" style="width: 50%"><span class="jl-step">50</span>%</div>
        </div>
    </header>
    <form class="loan-repayment-calculator" novalidate="novalidate">
        <fieldset class="loan-data">
            <legend><?php esc_html_e( 'Loan Data', 'jimmo-wp-loan-repayment-calculator' ); ?></legend>
            <label for="loan-amount"><?php esc_html_e( 'Loan Amouont', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="loan-amount" class="loan-amount" placeholder="<?php esc_attr_e( 'e.g.', 'jimmo-wp-loan-repayment-calculator' ); ?> 10000<?php /* translators: decimal mark  */esc_attr_e( '.', 'jimmo-wp-loan-repayment-calculator' ); ?>00">
            <label for="annual-percentage"><?php esc_html_e( 'Annual percentage rate (in % - nominal)', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="annual-percentage" class="annual-percentage" placeholder="<?php esc_attr_e( 'e.g.', 'jimmo-wp-loan-repayment-calculator' ); ?> 2<?php /* translators: decimal mark  */esc_attr_e( '.', 'jimmo-wp-loan-repayment-calculator' ); ?>00">
            <label for="initial-repayment-rate"><?php esc_html_e( 'Initial repayments (in %)', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="initial-repayment-rate" class="initial-repayment-rate" placeholder="<?php esc_attr_e( 'e.g.', 'jimmo-wp-loan-repayment-calculator' ); ?> 2<?php /* translators: decimal mark  */esc_attr_e( '.', 'jimmo-wp-loan-repayment-calculator' ); ?>00">
            <label for="monthly-payment"><?php esc_html_e( 'Monthly Payment', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="monthly-payment" class="monthly-payment" placeholder="<?php esc_attr_e( 'e.g.', 'jimmo-wp-loan-repayment-calculator' ); ?> 100<?php /* translators: decimal mark  */esc_attr_e( '.', 'jimmo-wp-loan-repayment-calculator' ); ?>00">
            <label for="period"><?php esc_html_e( 'Period in years', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="period" class="period" placeholder="<?php esc_attr_e( 'e.g.', 'jimmo-wp-loan-repayment-calculator' ); ?> 10<?php /* translators: decimal mark  */esc_attr_e( '.', 'jimmo-wp-loan-repayment-calculator' ); ?>00">
            <input type="button" name="continue-loan-data" class="continue continue-loan-data" value="<?php esc_attr_e('continue', 'jimmo-wp-loan-repayment-calculator'); ?>" disabled="disabled">
        </fieldset>
        <fieldset class="calculated-results hidden">
            <label for="annual-rate"><?php esc_html_e( 'Annual rate', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="annual-rate" class="annual-rate" placeholder="---" readonly="readonly">
            <label for="total-paid"><?php esc_html_e( 'Total paid', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="total-paid" class="total-paid" placeholder="---" readonly="readonly">
            <label for="total-interest"><?php esc_html_e( 'Total interest', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="total-interest" class="total-interest" placeholder="---" readonly="readonly">
            <label for="total-duration"><?php esc_html_e( 'Total duration (in months)', 'jimmo-wp-loan-repayment-calculator'); ?></label>
            <input type="text" name="total-duration" class="total-duration" placeholder="---" readonly="readonly">
            <label><strong><?php esc_html_e( 'Show ammortization plan', 'jimmo-wp-loan-repayment-calculator' ) ?></strong></label>
            <div>
                <div class="width-50">
                    <label for="ammortization-start-month"><?php esc_html_e( 'Start Month', 'jimmo-wp-loan-repayment-calculator' ) ?></label>
                    <select name="ammortization-start-month" class="ammortization-start-month">
                        <option value="1"><?php esc_html_e( 'January', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="2"><?php esc_html_e( 'February', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="3"><?php esc_html_e( 'March', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="4"><?php esc_html_e( 'April', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="5"><?php esc_html_e( 'May', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="6"><?php esc_html_e( 'June', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="7"><?php esc_html_e( 'July', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="8"><?php esc_html_e( 'August', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="9"><?php esc_html_e( 'September', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="10"><?php esc_html_e( 'October', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="11"><?php esc_html_e( 'November', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                        <option value="12"><?php esc_html_e( 'December', 'jimmo-wp-loan-repayment-calculator' ) ?></option>
                    </select>
                </div>
                <div class="width-50">
                    <label for="ammortization-start-year"><?php esc_html_e( 'Start Year', 'jimmo-wp-loan-repayment-calculator' ) ?></label>
                    <select name="ammortization-start-year"class="ammortization-start-year">
                    </select>
                </div>
            </div>
            <input type="hidden" name="jwr-locale" class="jwr-locale" value="<?php echo $this->locale; ?>">
            <input type="button" name="back-calculated-results" class="back back-calculated-results" value="<?php esc_attr_e('back', 'jimmo-wp-loan-repayment-calculator'); ?>">
            <input type="button" name="show-ammortization-schedule" class="show-ammortization-schedule" value="<?php esc_attr_e( 'Show ammortization plan', 'jimmo-wp-loan-repayment-calculator' ); ?>">
        </fieldset>
    </form>


    <div class="sk-fading-circle hidden">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    </div>

    <div class="ammortization-plan hidden">
        <div class="disclaimer">
            <?php esc_html_e( 'This schedule is calculated based on your input with standards calculation methods. The actual values might be marginally different.', 'jimmo-wp-loan-repayment-calculator' ) ?>
        </div>
        <div class="table-container">
            <table >
                <thead>
                    <tr>
                        <th><?php esc_html_e( 'Month / Year', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Liabilities', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Mortgage', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Payment', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Redemption', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Interest', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                        <th><?php esc_html_e( 'Total interest', 'jimmo-wp-loan-repayment-calculator' ); ?></th>
                    </tr>
                </thead>
                <tbody  class="ammortization-plan-data">
                </tbody>
            </table>
        </div>
    </div>
    <?php if ( get_option( 'jimmo_wp_loan_repayment_calculator_display_credits' ) ) { ?>
        <div class="jimmo-credit">
            <?php printf(
                __('Powered by JIMMO WP Loan Budget Calculator - <a href="%s">JIMMO-TOOLs</a> Software for real estate agents.', 'jimmo-wp-loan-repayment-calculator' ),
                'http://www.jimmo-tool.de/'
            ); ?>
        </div>
    <?php } ?>
</div>