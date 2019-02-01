$(document).ready(function () {
  $("#signUpSubmit").on("click", function () {
    event.preventDefault();

    console.log($("#uname").val().trim());
    console.log($("#psw").val().trim());

    var newUser = {
      username: $("#uname").val().trim(),
      password: $("#psw").val().trim(),
    };

    $.post("/api/signUp/", newUser);
    $("#uname").val() === "";
    $("#psw").val() === "";
  })

  $("#loginSubmit").on("click", function () {
    event.preventDefault();

    console.log($("#loginuname").val().trim());
    console.log($("#loginpsw").val().trim());

    var checkUser = {
      username: $("#loginuname").val().trim(),
      password: $("#loginpsw").val().trim(),
    };

    console.log(checkUser);

    $.post("/api/login/", checkUser);
  })
});

//sarah user
//123 password