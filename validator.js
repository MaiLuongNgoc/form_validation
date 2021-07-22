//đối tượng 'Validator'
function Validator(options) {
    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var erorrMessage = rule.test(inputElement.value);
        var errorElement =
            inputElement.parentElement.querySelector(options.errorSelector);

        if (erorrMessage) {
            errorElement.innerText = erorrMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove("invalid");
        }
    }

    //Lấy Element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };

                //xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement =
                        inputElement.parentElement.querySelector(
                            options.errorSelector
                        );

                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}

//định nghĩa các rules
//Nguyên tắc của rules:
//1. Khi có lỗi => trả ra message lỗi
//2. Khi hợp lệ => trả ra undefined

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này";
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? undefined : message || "Trường này phải là email";
        },
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Mật khẩu phải có ít nhất ${min} ký tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';

        }
    }

}