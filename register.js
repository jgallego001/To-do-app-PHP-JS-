let registerForm = document.getElementById("register-form");

registerForm.onsubmit = async () => {
  const datos = new FormData(registerForm);

  await fetch("./front_api/register.php", {
    method: 'POST',
    body: datos,
  });
};
