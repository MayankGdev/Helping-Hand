$().ready(function () {

    $.validator.addMethod("nowhitespace", function (value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "No white space please");

    $("#signin-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 32,
                nowhitespace: true
            }
        },
        messages: {
            email: {
                required: "Email can not be empty",
                email: "Invalid email format"
            },
            password: {
                required: "Password can not be empty",
                minlength: "Password must be 6 or more character",
                maxlength: "password must be lessthan 33 character",
                nowhitespace: "Password can not contain spaces"
            }
        }
    });
});