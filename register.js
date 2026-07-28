let registerForm = document.getElementById("register-form");

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const datos = new FormData(registerForm);

  await fetch("./front_api/register.php", {
    method: "POST",
    body: datos,
  });

  window.location.href = "./login.html";
};
