
var PassPlexityValidation = {
    modules: [
		{
            name: "pp-alphanumeric",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            regex: /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
            description: "Alphanumeric"
        },
		{
            name: "pp-lowercase",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            regex: /[a-z]/g,
            description: "Contain # lower case character/s"
        },
				{
            name: "pp-number",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            regex: /\d+/g,
            description: "Contain # number character/s"
        },
		{
            name: "pp-symbol",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            regex: /[!@#$£%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g,
            description: "Contain # symbol character/s"
        },
        {
            name: "pp-uppercase",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            regex: /[A-Z]/g,
            description: "Contain # upper case character/s"
        },
		{
            name: "pp-minimum",
            enabled: false,
            valid: false,
            min: 1,
			current : 0,
            message: "",
            description: "Have minimum length of #"
        }

    ],
    isValid: function() {
        return !this.modules.some(x => x.valid == false && x.enabled == true)
    }
    ,
    applyPassPlexity:function()
    {
        var elements = document.getElementsByClassName('pp-validate');
	
        if (elements == null || elements.length == 0){
            writeConsoleError("PassPlexity could not be applied. No element could be found with the class 'pp-validate'");
        }
        else if (elements.length > 1){
            writeConsoleError("PassPlexity could not be applied. Found " + elements.length + " elements with the class 'pp-validate'. Only 1 element can be targeted.");
        }
        else{
            elements[0].addEventListener('keyup', function(e) {
                provideUserFeedback();
            });
            
            elements[0].addEventListener('focusin', function(e) {
                provideUserFeedback();
            });
            
            elements[0].addEventListener('focusout', function(e) {
                hideFeedback();
            });
        }
    }
}

function getPPValidateElement()
{
	return document.getElementsByClassName('pp-validate')[0];
}

function getPPFeedbackElement()
{
	return document.getElementsByClassName('pp-feedback')[0];
}

function provideUserFeedback() {
    var classes = getPPValidateElement().className.split(' ');

    for (var i = 0; i < classes.length; i++) {
        validateComplexity(classes[i]);
    }

    setHtml(generateHtml());
}

function setHtml(html)
{
	getPPFeedbackElement().innerHTML = html;
}

function validateComplexity(className) {
    var str = getPPValidateElement().value;
    var passPlexityValidationModule = PassPlexityValidation.modules.find(x => x.name === className.substr(0, className.lastIndexOf('_') == -1 ? className.length : className.lastIndexOf('_')))

    if (passPlexityValidationModule != null) {
        passPlexityValidationModule.enabled = true;
        passPlexityValidationModule.min = getMinimumRequiredForModule(className);

        if (passPlexityValidationModule.regex != null) {
            passPlexityValidationModule.current = str.length - str.replace(passPlexityValidationModule.regex, '').length;

            if (passPlexityValidationModule.current >= passPlexityValidationModule.min) {
                updateModuleValidity(passPlexityValidationModule, true);
            } else {
                updateModuleValidity(passPlexityValidationModule, false);
            }
        } else {
			passPlexityValidationModule.current = str.length;
            if (str.length >= passPlexityValidationModule.min) {
                updateModuleValidity(passPlexityValidationModule, true);
            } else {
                updateModuleValidity(passPlexityValidationModule, false);
            }
        }
    }
}

function getMinimumRequiredForModule(className) {
    return isNaN(parseInt(className.substr(className.lastIndexOf("_") + 1))) ? 1 : parseInt(className.substr(className.lastIndexOf("_") + 1));
}

function updateModuleValidity(module, valid) {
    module.valid = valid;
    module.description;
}

function hideFeedback()
{
	setHtml("");
}

function writeConsoleError(error)
{
	console.error(error);
}

function generateHtml() {
	var html = "";
	
	var message = '' ;

	PassPlexityValidation.modules.forEach(function (module)
	{
		if (module.enabled == true)
		{
			message += module.valid ? '<span class="badge alert-success mr-1 p-1">' : '<span class="badge alert-danger mr-1 p-1">';
			message += module.valid ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>';
			message += ' ' + module.description.replace("#",module.min) + '</span>';
		}
	});
    
    html += '<div class="mb-2">';
	if (PassPlexityValidation.isValid())
	{
		// 
	}
	else{
		// html += '<div class="alert alert-danger""><div class="card-body"><p class="card-text">';
		
	}
	
	html += message + '</div></div>';
	
	return html;
}