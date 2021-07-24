/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with numbers setup
$(".number-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function(event, currentIndex) {
        alert("Form submitted.");
    }
});

// Wizard tabs with icons setup
$(".icons-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function(event, currentIndex) {
        alert("Form submitted.");
    }
});

// Validate steps wizard

// Show form
var form = $(".steps-validation").show();

$(".steps-validation").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onStepChanging: function(event, currentIndex, newIndex) {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex) {
            return true;
        }

        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex) {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function(event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function(event, currentIndex) {
        alert("Submitted!");
    }
});
$.validator.addMethod("nospace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
}, 'Password should not contain empty spaces');
$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]/i.test(value);
}, 'letters only please');
$.validator.addMethod("emailexp", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value);
}, 'Please enter a valid email address');
$.validator.addMethod("positiveonly", function(value, element) {
    return this.optional(element) || /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/i.test(value);
}, 'please enter some amount');
// Initialize validation
$(".steps-validation").validate({
    errorElement: 'div',
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function(element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function(element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function(error, element) {
        error.insertAfter(element);
    },
    rules: {
        image: {
            required: true
        },
        username: {
            required: true,
            lettersonly: true,
            maxlength: 25,
            minlength: 3
        },
        phone: {
            required: true,
            maxlength: 12,
            minlength: 10
        },
        location: {
            required: true,
        },
        confirmPassword: {
            required: true,
            equalTo: '#passwordfloatingicon'
        },
        email: {
            required: true,
            emailexp: true,
            maxlength: 64,
        },
        password: {
            nospace: true,
            minlength: 6,
            maxlength: 20,
            required: true,
        },
    },
    messages: {
        image: {
            required: 'Please select the image!'
        },
        username: {
            required: "Text field is required.",
            // lettersonly: 'only letters'
            // number: 'only numbers required.'
        },
        phone: {
            minlength: "Minimum 10 numbers allow",
            maxlength: "Maximum 12 numbers allow",
        },
        confirmPassword: {
            equalTo: 'Confirm password did not match.'
        },
        password: {
            minlength: "Minimum 6 characters allowed",
            maxlength: "Maximum 20 characters allowed"
        }
    }
});