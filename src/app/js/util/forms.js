/*************** Dependencies ***************/
var _       = require('dom-manipulator');
/********************************************/

function _vF(form) {
    var fullList             = _._byAttr('required', 'required', form)
    ,   collectionRequired   = []
    ,   validInputs          = 0;

    if (fullList.length !== undefined) {
        collectionRequired = collectionRequired.concat(fullList);
    } else {
        collectionRequired.push(fullList)
    }

    for(var i = 0, lgt = collectionRequired.length; i < lgt; i++) {
        var input = collectionRequired[i]
        ,   label = _._byAttr('for', input.id, form);

        if (!_vIF(input)) {
            _._removeClass(input, 'error');
            _._removeClass(label, 'error');
            input.className += " error";
            label.className += " error";
        } else {
            _._removeClass(input, 'error');
            _._removeClass(label, 'error');
            validInputs++;
        }
    }

    return (validInputs === collectionRequired.length)

    // if (validInputs === collectionRequired.length) {
    //     var data = _._parseForm(this);
    // }
}

function _vIF(inputSelector) {
    var inputType = inputSelector.getAttribute('type') || inputSelector.type;

    if (inputType === 'text' || inputType === 'textarea') {
        if (inputSelector.getAttribute('data-type') === 'name') {
            return (new RegExp(/^\D+\s+\D+$/)).test(inputSelector.value);
        } else {
            return (inputSelector.value !== '') ? true : false;
        }
    } else if (inputType === 'email') {
        return (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).test(inputSelector.value);
    } else if (inputType === 'number' || inputType === 'cpf' || inputType === 'telefone' || inputType === 'cep') {
        var inputValue  = inputSelector.value
        ,   inputLength = inputValue.length
        ,   maxNumber   = inputSelector.max || 999999999
        ,   minNumber   = inputSelector.min || 0
        ,   ruleRegex   = ''
        ,   isValid     = true;

        if (inputType === 'telefone') {
            ruleRegex = /^\([0-9]{2}\)\s?[0-9]{4,5}\-[0-9]{4}$/;
        } else if (inputType === 'cpf') {
            ruleRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/;
            isValid = $CPFValidator(inputValue);
        } else if (inputType === 'cep') {
            ruleRegex = /^[0-9]{5}\-[0-9]{3}$/;
        } else {
            ruleRegex = /^\d+$/;
        }

        return ((inputLength >= minNumber && inputLength <= maxNumber) && (new RegExp(ruleRegex)).test(inputValue) && isValid);
    } else {
        return true;
    }
}

function _cM(e) {
    var mask            =   ''
    ,   input           =   this
    ,   inputValue      =   this.value
    ,   inputType       =   this.getAttribute('type')
    ,   inputTelType    =   this.getAttribute('data-type')
    ,   literalPattern  =   /[0\*]/
    ,   numberPattern   =   /[0-9]/
    ,   newValue        =   '';

    // CPF MASK
    if (inputType === 'cpf') {
        mask = '000.000.000-00';
    } 

    // TELEFONE (FIXO/MOVEL) MASK
    else if (inputType === 'telefone') {
        if (inputTelType === 'fixo') {
            mask = '(00) 0000-0000'
        } else {
            mask = '(00) 00000-0000'
        }
    } 

    // CEP MASK
    else if (inputType === 'cep') {
        mask = '00000-000';
    }

    for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
        if (mId >= inputValue.length)
            break;

        if (mask[mId] == '0' && inputValue[vId].match(numberPattern) == null) {
          break;
        }

        while (mask[mId].match(literalPattern) == null) {
            if (inputValue[vId] == mask[mId])
               break;

            newValue += mask[mId++];
        }

        newValue += inputValue[vId++];
        mId++;
    }

    input.value = newValue;
}

function $CPFValidator(cpf) {
    var  Soma  = 0
    ,    Resto = 0
    ,    cpf   = cpf.replace(/[^0-9]/g,'');

    if (cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999") return false;
    
    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
    
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}

module.exports = {
    _validateForm      : _vF,
    _validateInputForm : _vIF,
    _createMask        : _cM
}