$().ready(function () {

    $("#pickupRegistration").validate({
        rules: {
           
            name:{
                required:true,
                minlength:3,
                maxlength:20
            },
            email: {
                required: true,
                email: true
            },
            Phone:{
                required:true,
                minlength:10,
                maxlength:10
            },
            address1:{
                required:true
            },
            address2:{
                required:true
            },
            landmark:{
                required:true
            },
            city:{
                required:true
            },
            state:{
                required:true
            },
            pincode:{
                required:true,
                minlength:4,
                maxlength:8
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 32,
            }
        },
        messages: {
            name:{
                required:"Name can't be Empty",
                minlength:"Name must be 3 or more character",
                maxlength:"Name must be lessthan 20 character"
            },

            email: {
                required: "Email can't be empty",
                email: "Invalid email format"
            },
            Phone:{
                required:"Phone no can't be empty",
                minlength:"Phone must be 10 character",
                maxlength:"Phone must be 10 character"
            },
            address1:{
                required:"address1 no can't be empty"            
            },
            address2:{
                required:"address2 no can't be empty"           
            },
            landmark:{
                required:"landmark no can't be empty"          
            },
            city:{
                required:"city no can't be empty"             
            },
            state:{
                required:"state no can't be empty"            
            },
            pincode:{
                required:"pincode no can't be empty", 
                minlength: "pincode must be 4 or more character",
                maxlength: "pincode must be less than 9 character",
            },
            
            password: {
                required: "Password can not be empty",
                minlength: "Password must be 6 or more character",
                maxlength: "password must be lessthan 33 character",
            }

        }
    });
});