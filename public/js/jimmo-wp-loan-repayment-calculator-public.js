(function( $ ) {
	'use strict';

	/**
	 * Define global constants for configuration.
	 * 
	 * @since	1.0.0
	 */
	var CONTAINER_CLASS = '.jl-repayment-widget';
	var STATUSBAR_CLASS = '.jl-statusbar-progress';
	var STATUSBAR_TEXT_CLASS = '.jl-step';
	var BUTTON_BACK_CLASS = '.back';
	var ERROR_CLASS_NAME = 'error';
	var DISCLAIMER_CLASS = '.disclaimer';
	var BUTTON_CONTINUE_CLASS = '.continue';
	var BUTTON_SHOW_SCHEDULE = ".show-ammortization-schedule";
	var LOADING_ANIMATION_CONTAINER_CLASS = '.sk-fading-circle';
	var SCHEDULE_CONTAINER = '.ammortization-plan'
	var SCHEDULE_TABLE_BODY_CONTAINER = '.ammortization-plan-data';
	var SCHEDULE_TABLE_FIELDS = [
		'liabilities',
		'mortgage',
		'payment',
		'redemption',
		'interest',
		'total_interest',
	];
	var INPUT_FIELDS = [
		{ propName: 'loanAmount',           domElement: '.loan-amount',            optional: false },
		{ propName: 'annualPercentage',     domElement: '.annual-percentage',      optional: false },
		{ propName: 'initialRepaymentRate', domElement: '.initial-repayment-rate', optional: true },
		{ propName: 'monthlyPayment',       domElement: '.monthly-payment',        optional: true },
		{ propName: 'period',               domElement: '.period',                 optional: true }
	];
	var OUTPUT_FIELDS = [
		{ propName: 'annualRate',         domElement: '.annual-rate' },
		{ propName: 'totalPaid', domElement: '.total-paid' },
		{ propName: 'totalInterest', domElement: '.total-interest' },
		{ propName: 'totalDuration',         domElement: '.total-duration' }
	];
	var DATE_SELECTOR_FIELDS = {
		month: '.ammortization-start-month',
		year: '.ammortization-start-year'
	};
	var LOCALE_FIELD = '.jwr-locale';
	var FORM_PAGES = [
		{ name: 'loan-data', percentage: 50 },
		{ name: 'calculated-results',    percentage: 90 }
	];

	/**
	 * Form Init Manager Module.
	 * 
	 * @since	1.0.0
	 */
	var FormInitManager = ( function() {

		/**
		 * Initialize form date selectors.
		 * 
		 * @since	1.0.0
		 */
		function publicInitForm() {
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var nextMonth = currentDate.getMonth() + 2;
			
			// Add Next 20 years as options
			for ( var year = currentYear; year < currentYear + 20; year++ ) {
				$( CONTAINER_CLASS + ' ' + DATE_SELECTOR_FIELDS.year ).append( '<option value="' + year + '">' + year + '</option>' );
			}

			// Initialize Month selector with next month
			if (nextMonth >= 13) {
				nextMonth -= 12;
				$( CONTAINER_CLASS + ' ' + DATE_SELECTOR_FIELDS.year ).val( currentYear + 1 );
			}
			$( CONTAINER_CLASS + ' ' + DATE_SELECTOR_FIELDS.month ).val( nextMonth );
		}

		/**
		 * 
		 * 
		 * @since	1.0.0
		 */
		return {
			initForm: publicInitForm
		}
	})();

	/**
	 * Status Bar Manager Module.
	 * 
	 * @since	1.0.0
	 */
	var statusBarManager = ( function() {

		/**
		 * Set Progress Bar to given value and width
		 * 
		 * @param {any} e 
		 * @param {any} progress 
		 */
		function publicSetProgress( e, progress ) {
			var statusBar = domManager.getElement( e, STATUSBAR_CLASS );
			var statusBarText = domManager.getElement( e, STATUSBAR_TEXT_CLASS );
			
			statusBarText.html( progress );
			statusBar.innerWidth( progress + "%" );
		}

		/**
		 * Ecpose public functions.
		 */
		return {
			setProgress: publicSetProgress
		}
	})();

	/**
	  * Loading Animation Manager Module.
	 * 
	 * @since	1.0.0
	  */
	var loadingAnimationManager = ( function() {

		/**
		 * Show loading animation.
		 * 
		 * @param {any} e 
		 */
		function publicShowLoadingAnimation( e ) {
			domManager.getElement(e, LOADING_ANIMATION_CONTAINER_CLASS ).slideDown(100);
		}

		/**
		 * Hide loading animation.
		 * 
		 * @param {any} e 
		 */
		function publicHideLoadinganimation( e ) {
			domManager.getElement(e, LOADING_ANIMATION_CONTAINER_CLASS ).slideUp(100);
		}

		/**
		 * Expose public functions.
		 */
		 return {
			 showLoadingAnimation: publicShowLoadingAnimation,
			 hideLoadingAnimation: publicHideLoadinganimation
		 }
	} )();

	/**
	 * Event Manager Module.
	 * 
	 * @since	1.0.0
	 */
	var eventManager = ( function() {

		/**
		 * Hold value of delay timer for form change events.
		 * 
		 * @since	1.0.0
		 */
		var formChangeEventDelayTimer;

		/**
		 * Handle all Button Click Events
		 * 
		 * @param {any} e 
		 */
		function buttonEventHandler( e ) {
			if ( e.hasClass( BUTTON_BACK_CLASS.replace( '.', '' ) ) || e.hasClass( BUTTON_CONTINUE_CLASS.replace( '.', '' ) ) ) {
				formStateManager.changePage( e );
			} else if ( e.hasClass( BUTTON_SHOW_SCHEDULE.replace( '.', '' ) ) ) {
				ammortizationScheduleManager.showAmmortizationSchedule( e )
			}
		}

		/**
		 * Handle all Form Change Events when input values change.
		 * 
		 * @param {any} e 
		 */
		function formChangeEventHandler( e ) {
			clearTimeout( formChangeEventDelayTimer );
			formChangeEventDelayTimer = setTimeout(function() {
				formDataManager.processFormData( e );
			}, 500);
		}
		
		/**
		 * Initialize all event handlers.
		 * 
		 */
		function publicInitEvents() {
			
			// Button Events
			$( CONTAINER_CLASS + ' input[type="button"]' ).click( function() {
				buttonEventHandler( $( this ) );
			} );

			// Input events
			$( CONTAINER_CLASS + ' input[type="text"]' ).on( 'propertychange input', function( e ) {
				var valueChanged = false;

				if ( 'propertychange' == e.type ) {
					valueChanged = 'value' == e.originalEvent.propertyName;
				} else {
					valueChanged = true;
				}

				if ( valueChanged ) {
					formChangeEventHandler( $(this) );
				}
			} );

			// Table row Click Event
			$( CONTAINER_CLASS + ' ' + SCHEDULE_CONTAINER ).on( 'click', '.year', function() {
				ammortizationScheduleManager.toggleYearRow( $( this ) );
			});
		}

		/**
		 * Expose public functions.
		 */
		return {
			initEvents: publicInitEvents
		}
	})();

	/**
	 * DOM Manager Module.
	 * 
	 * @since	1.0.0
	 */
	var domManager = ( function() {

		/**
		 * Find container element of element.
		 * 
		 * @param {any} e 
		 * @returns {any}
		 */
		function findContainer( e ) {
			var container = e.closest( CONTAINER_CLASS );
			return container;
		}

		/**
		 * Find element inside of container.
		 * 
		 * @param {any} container 
		 * @param {any} element 
		 * @returns {any}
		 */
		function findElement ( container, element ) {
			var element = container.find( element );
			return element;
		}

		/**
		 * Get element inside the same container.
		 * 
		 * @param {any} e 
		 * @param {any} target 
		 * @returns {any}
		 */
		function publicGetElement( e, target ) {
			var container = findContainer( e );
			var element = findElement ( container, target );
			return element;
		}

		/**
		 * Find Field DOM Element by given property name.
		 * 
		 * @param {any} prop 
		 * @returns  {any} 
		 */
		function publicFindFieldDomElementByPropName( prop ) {
			var fields = INPUT_FIELDS.concat( OUTPUT_FIELDS );
			var domElement = fields.filter( function( field ) {
				return prop == field.propName;
			} );
			
			return domElement[0].domElement;
		}

		/**
		 * Find property name by given Field DOM Element.
		 * 
		 * @param {any} prop 
		 * @returns  {any} 
		 */
		function publicFindPropNameByFieldDomElement( domElement ) {
			var fields = INPUT_FIELDS.concat(OUTPUT_FIELDS);
			var prop = fields.filter( function( field ) {
				return '.' + domElement.context.className.replace( ' ' + ERROR_CLASS_NAME , '' ) == field.domElement;
			} );

			return prop[0].propName;
		}
		
		/**
		 * Expose public functions.
		 */
		return {
			getElement: publicGetElement,
			findFieldDomElementByPropName: publicFindFieldDomElementByPropName,
			findPropNameByFieldDomElement: publicFindPropNameByFieldDomElement
		}
	})();

	/**
	 * Form State Manager Module.
	 * 
	 * @since	1.0.0
	 */
	var formStateManager = ( function() {

		/**
		 * Slide up current page, slide down new page.
		 * 
		 * @param {any} e 
		 * @param {any} currentPage 
		 * @param {any} newPage 
		 */
		function switchPage( e, currentPage, newPage ) {
			domManager.getElement( e, '.' + FORM_PAGES[ currentPage ]['name'] ).slideUp( 500 );
			domManager.getElement( e, '.' + FORM_PAGES[ newPage ]['name'] ).slideDown( 500 );
			statusBarManager.setProgress( e, FORM_PAGES[ newPage ]['percentage'] );
			if (1 === currentPage) {
				domManager.getElement( e, SCHEDULE_CONTAINER ).slideUp( 500 );
			}
		}
		
		/**
		 * Change Page when a button is clicked.
		 * 
		 * @param {any} e 
		 */
		function publicChangePage( e ) {
			var operation, currentPage, newPage;

			// Detect operation (continue or back).
			if ( e.hasClass( BUTTON_BACK_CLASS.replace( '.', '' ) ) ) {
				operation = BUTTON_BACK_CLASS.replace( '.', '' );
			} else {
				operation = BUTTON_CONTINUE_CLASS.replace( '.', '' );
			}

			// Find current page id
			FORM_PAGES.forEach( function( page, index ) {
				if ( e.hasClass( operation + '-' + page.name ) ) {
					currentPage = index;
				}
			} );

			// Find new page id
			if ( BUTTON_BACK_CLASS.replace( '.', '' ) === operation ) {
				newPage = currentPage - 1;
			} else {
				newPage = currentPage + 1;
			}

			// switch page
			switchPage( e, currentPage, newPage );
		}

		/**
		 * Read form input values into object.
		 * 
		 * @param {any} e 
		 * @returns {any}
		 */
		function publicGetFormValues( e ) {
			var FormValues = {};
			INPUT_FIELDS.forEach( function( field ) {
				FormValues[ field.propName ] = domManager.getElement( e, field.domElement ).val().replace( ',', '.' ) ;
			} );
			return FormValues;
		}

		/**
		 * Write calculated results to form fields
		 * 
		 * @param {any} e 
		 * @param {any} resultValues 
		 * @param {any} inputValues 
		 */
		function publicWriteResults( e, resultValues, inputValues ) {
			OUTPUT_FIELDS.forEach( function( field ) {
				if ( isFinite( resultValues[field.propName] ) ) {
					domManager.getElement( e, field.domElement ).val( resultValues[ field.propName ].toFixed( 2 ) );
					if ( resultValues[field.propName] <= 0 ) {
						domManager.getElement( e, field.domElement ).addClass( ERROR_CLASS_NAME );
					} else {
						domManager.getElement( e, field.domElement ).removeClass( ERROR_CLASS_NAME );
					}
				} else {
					domManager.getElement( e, field.domElement ).val( '' );
					domManager.getElement( e, field.domElement ).removeClass( ERROR_CLASS_NAME );
				}
				
			} );

			setButtonStates( e, resultValues, inputValues );
		}

		/**
		 * Check for invalid form values, set class error on invalid values.
		 * 
		 * @param {any} e 
		 * @param {any} inputValues 
		 * @returns {any} 
		 */
		function publicSetInputErrorState(e, inputValues ) {
			INPUT_FIELDS.forEach( function( field ) {
				if (  inputValues[field.propName] != '' && ( ! isFinite( inputValues[field.propName] ) || inputValues[field.propName] <= 0 ) && inputValues[field.propName] != null ) {
					domManager.getElement( e, field.domElement ).addClass( ERROR_CLASS_NAME );
					inputValues[field.propName] = NaN;
				} else {
					domManager.getElement( e, field.domElement ).removeClass( ERROR_CLASS_NAME );
				}
			} );
			return inputValues;
		}

		/**
		 * Set State of continue buttons according to form state.
		 * 
		 * @param {any} e 
		 * @param {any} resultValues 
		 * @param {any} inputValues 
		 */
		function setButtonStates( e, resultValues, inputValues ) {
			var allFieldsValid = true;
			INPUT_FIELDS.forEach( function( field ) {
				if ( '' === domManager.getElement( e, field.domElement ).val() || domManager.getElement( e, field.domElement ).val() <= 0 || ! isFinite( inputValues[field.propName] ) ) {
						allFieldsValid = false;
				}
			} );

			if ( allFieldsValid ) {
				domManager.getElement( e, BUTTON_CONTINUE_CLASS + '-' + FORM_PAGES[0].name  ).attr( 'disabled', false );
			} else {
				domManager.getElement( e, BUTTON_CONTINUE_CLASS + '-' + FORM_PAGES[0].name  ).attr( 'disabled', true );
			}
			
		}

		/**
		 * Expose public functions
		 */
		return {
			changePage: publicChangePage,
			getFormValues: publicGetFormValues,
			writeResults: publicWriteResults,
			setInputErrorState: publicSetInputErrorState
		}
	})();

	/**
	 * Process data in the form.
	 * 
	 * @since	1.0.0
	 */
	 var formDataManager = ( function() {
		
		/**
		 * Stores form input values
		 */
		var inputValues;
		
		/**
		 * Check if form is valid for input field calculations.
		 * 
		 * Valid if all required fields and at least one optional field have valid values,
		 * and no field was tagged with error class before.
		 * 
		 * @param {any} e
		 * @returns bool formValid
		 * 
		 */
		function validateFormforOptionalFieldCalculation ( e ) {
			var optFieldsValid = false, reqFieldsValid = true, formValid = true
			;
			$.each( INPUT_FIELDS, function( i, field ) {
				if ( domManager.getElement( e, field.domElement ).hasClass( ERROR_CLASS_NAME ) ) {
					formValid = false;
					return false;
				} else if ( field.optional && ! inputValues[field.propName] == '' ) {
					optFieldsValid = true;
				} else if ( ! field.optional && inputValues[field.propName] == '' ) {
					reqFieldsValid = false;
				}
			} );
			if ( formValid && optFieldsValid && reqFieldsValid ) {
				formValid = true;
			} else {
				formValid = false;
			}

			return formValid;
		}

		/**
		 * Calculate optional fields when initialRepaymentRate is set
		 * 
		 */
		function calculateFromInitialRepaymentRate() {
			inputValues.monthlyPayment = inputValues.loanAmount * ( inputValues.annualPercentage - ( -inputValues.initialRepaymentRate) ) / 100 / 12;
			var percentageFactor = 1 - (- ( ( inputValues.annualPercentage / 12 ) / 100) );
			inputValues.period = ( ( -1 ) * ( Math.log ( 1 - ( inputValues.loanAmount / inputValues.monthlyPayment ) * ( percentageFactor - 1 ) )  / Math.log( percentageFactor ) )) / 12;
		}

		/**
		 * Calculate optional fields when monthlyPayment is set
		 * 
		 */
		function calculateFromMonthlyPayment() {
			inputValues.initialRepaymentRate = (inputValues.monthlyPayment * 100 * 12) / inputValues.loanAmount - inputValues.annualPercentage;
			if ( inputValues.initialRepaymentRate > 0 ) {
				var percentageFactor = 1 - (- ( ( inputValues.annualPercentage / 12 ) / 100) );
				inputValues.period = ( ( -1 ) * ( Math.log ( 1 - ( inputValues.loanAmount / inputValues.monthlyPayment ) * ( percentageFactor - 1 ) )  / Math.log( percentageFactor ) )) / 12;
			} else {
				inputValues.period = '';
			}
		}

		/**
		 * Calculate optional fields when period is set
		 * 
		 */
		function calculateFromPeriod() {
			var q = 1 - ( -(inputValues.annualPercentage / 12) / 100);
			inputValues.monthlyPayment = inputValues.loanAmount * Math.pow(q, (inputValues.period * 12)) * ((q - 1)/(Math.pow(q, (inputValues.period * 12)) -1));
			inputValues.initialRepaymentRate = (inputValues.monthlyPayment * 100 * 12) / inputValues.loanAmount - inputValues.annualPercentage;
		}

		/**
		 * Calculate missing values of optional fields according to input value
		 * 
		 * @param {any} e 
		 */
		function calculateOptionalFields( e ) {

			//var activeField.propName = domManager.findPropNameByFieldDomElement( e );
			var activeField = INPUT_FIELDS.filter( function( field ) {
				return field.propName == domManager.findPropNameByFieldDomElement( e );
			} )[0];

			// If input field was cleared, clear all optional fields and exit function
			if ( '' === e.val() ) {
				INPUT_FIELDS.forEach( function( field ) {
					if ( field.optional) {
						domManager.getElement( e, field.domElement ).val( '' );
						inputValues[field.propName] = '';
					}
				} );
				formStateManager.setInputErrorState( e, inputValues );
				return false;
			}

			// Clear optional fields that were not changed and have an error
			INPUT_FIELDS.forEach( function( field ) {
				if ( field.optional && field.propName != activeField.propName && domManager.getElement( e, field.domElement ).hasClass( ERROR_CLASS_NAME ) ) {
					domManager.getElement( e, field.domElement ).val( '' );
					inputValues[field.propName] = '';
				}
			} );

			formStateManager.setInputErrorState( e, inputValues );

			if ( ! validateFormforOptionalFieldCalculation( e ) ) {
				INPUT_FIELDS.forEach( function( field ) {
					if ( field.optional && field.propName == activeField.propName && domManager.getElement( e, field.domElement ).hasClass( ERROR_CLASS_NAME ) ) {
						inputValues[field.propName] = NaN;
					}
					if ( field.optional && field.propName != activeField.propName ) {
						inputValues[field.propName] = '';
					}
				} );
			} else {				
				// Calculate values according to input values
				switch ( activeField.propName ) {
				case 'initialRepaymentRate':
					calculateFromInitialRepaymentRate();
					break;
				case 'monthlyPayment':
					calculateFromMonthlyPayment();
					break;
				case 'period':
					calculateFromPeriod();
					break;
				default:
					if ( ! domManager.getElement( e, domManager.findFieldDomElementByPropName( 'initialRepaymentRate' ) ).hasClass( ERROR_CLASS_NAME ) && inputValues.initialRepaymentRate != '' ) {
						calculateFromInitialRepaymentRate();
					} else if ( ! domManager.getElement( e, domManager.findFieldDomElementByPropName( 'monthlyPayment' ) ).hasClass( ERROR_CLASS_NAME ) && inputValues.monthlyPayment != '' ) {
						calculateFromMonthlyPayment();
					} else if ( ! domManager.getElement( e, domManager.findFieldDomElementByPropName( 'period' ) ).hasClass( ERROR_CLASS_NAME ) && inputValues.period != '' ) {
						calculateFromPeriod();
					}
				}
			}

			INPUT_FIELDS.forEach( function( field ) {
				if (field.optional ) {
					if ( isFinite( inputValues[field.propName] ) && field.domElement != '.' + e.context.className.replace( ' ' + ERROR_CLASS_NAME , '' ) && inputValues[field.propName] != null && inputValues[field.propName] != '' ) {
						domManager.getElement( e, field.domElement ).val( parseFloat( inputValues[field.propName] ).toFixed( 2 ) );
					} else if ( field.domElement != '.' + e.context.className.replace( ' ' + ERROR_CLASS_NAME , '' ) ) {
						domManager.getElement( e, field.domElement ).val( '' );
					}
				}
			} );

			formStateManager.setInputErrorState( e, inputValues );
		}

		/**
		 * Calculate results according to values entered in the form.
		 * 
		 * @param {any} e 
		 * @returns 
		 */
		function calculateOutputValues( e ) {
			var outputValues = {};

			outputValues.annualRate = inputValues.monthlyPayment * 12;
			outputValues.totalPaid = inputValues.monthlyPayment * inputValues.period * 12;
			outputValues.totalInterest = outputValues.totalPaid - inputValues.loanAmount;
			outputValues.totalDuration = inputValues.period * 12;

			return outputValues;
		}

		/**
		 * Process input values of the form on every change.
		 * 
		 * @param {any} e 
		 */
		function publicProcessFormData( e ) {
			inputValues = formStateManager.getFormValues( e );
			inputValues = formStateManager.setInputErrorState( e, inputValues );
			calculateOptionalFields( e );
			var outputValues = calculateOutputValues( e );
			formStateManager.writeResults( e, outputValues, inputValues );
			inputValues = undefined;
		}

		/**
		 * Expose public functions
		 */
		return {
			processFormData: publicProcessFormData
		}

	 })();

	 /**
	  * Ammortization Schedule Manager Module.
	 * 
	 * @since	1.0.0
	  */
	 var ammortizationScheduleManager = ( function() {

		/**
		 * Get all form values (input and calculated).
		 * 
		 * @param {any} e 
		 * @returns {any} 
		 */
		function getCreditData( e ) {
			// Create array of all form fields, empty object for credit data
			var formFields = INPUT_FIELDS.concat( OUTPUT_FIELDS ), creditData = {};
			
			// Read credit data from form
			formFields.forEach( function( field ) {
				creditData[ field.propName ] = parseFloat( domManager.getElement( e, field.domElement ).val().replace( ',', '.' ) ).toFixed( 2 );
			} );

			// read start date from select elements
			creditData.startDate = {
				'startMonth': domManager.getElement( e, DATE_SELECTOR_FIELDS.month ).val(),
				'startYear': domManager.getElement( e, DATE_SELECTOR_FIELDS.year ).val()
			}

			creditData.locale = domManager.getElement( e, LOCALE_FIELD ).val();

			return creditData;
		}

		/**
		 * Get data for ammortization schedule from server.
		 * 
		 * @param {any} e 
		 * @param {any} creditData 
		 * @returns {promise}
		 */
		function getAmmortizationScheduleData( e, creditData ) {
			var plan = $.post( 
				jimmo_wp_loan_repayment_calculator_ajax_obj.ajax_url, {
					_ajax_nonce: jimmo_wp_loan_repayment_calculator_ajax_obj.nonce,
					action: 'repayment_calculate_ammortization_schedule',
					creditData: creditData				
				}
			);

			return plan;
			
		}

		/**
		 * Retrieve schedule data and render it into table element.
		 * 
		 * @param {any} e 
		 */
		function publicShowAmmortizationSchedule( e ) {
			var creditData = getCreditData( e );

			loadingAnimationManager.showLoadingAnimation( e );

			var scheduleDataPromise = getAmmortizationScheduleData( e, creditData );
			scheduleDataPromise.success( function( scheduleData ) {
				
				// Delete table data if exists
				domManager.getElement( e, SCHEDULE_TABLE_BODY_CONTAINER ).empty();
				domManager.getElement( e, '.error' ).remove();

				// Render year rows
				$.each( scheduleData, function(index, valueYear) {
					var TableRowYear = '<tr class="year">';
					TableRowYear += '<td>' + valueYear.year + '</td>';

					SCHEDULE_TABLE_FIELDS.forEach( function( field ) {
						TableRowYear += '<td>' + valueYear[ field ] + '</td>';
					} );

					TableRowYear += '</tr>'
					domManager.getElement( e, SCHEDULE_TABLE_BODY_CONTAINER ).append( TableRowYear );

					// Render month rows
					$.each( valueYear.single_months, function(index, valueMonth) {
						var TableRowMonth = '<tr class="month">';
						TableRowMonth += '<td>' + valueMonth.month + '</td>';

						SCHEDULE_TABLE_FIELDS.forEach( function( field ) {
							TableRowMonth += '<td>' +  valueMonth[ field ] + '</td>';
						} );
						
						TableRowMonth += '</tr>'
						domManager.getElement( e, SCHEDULE_TABLE_BODY_CONTAINER ).append( TableRowMonth );
					} );

					// Show error if table was cut off
					if ( valueYear['error'] ) {
						var error = '<div class="error">';
						error += valueYear.error.message;
						error += '</div>';
						domManager.getElement( e, DISCLAIMER_CLASS ).after( error );
					}
				} );
				
				statusBarManager.setProgress( e, 100 );

				// Hide loading animation, show data table
				domManager.getElement( e, SCHEDULE_TABLE_BODY_CONTAINER + " tr.year" ).first().nextUntil( 'tr.year' ).show();
				loadingAnimationManager.hideLoadingAnimation( e );
				domManager.getElement( e, SCHEDULE_CONTAINER ).slideDown( 500 );
			} );

		}

		/**
		 * Toggle Month Rows on tr.year click event.
		 * 
		 * @param {any} e 
		 */
		function publicToggleYearRow( e ) {
			e.nextUntil( 'tr.year' ).toggle();
		}

		/**
		 * Expose public functions.
		 */
		return {
			showAmmortizationSchedule: publicShowAmmortizationSchedule,
			toggleYearRow: publicToggleYearRow
		}
	} )();

	$(window).load(function() {
		FormInitManager.initForm();
		eventManager.initEvents();
	});


})( jQuery );
