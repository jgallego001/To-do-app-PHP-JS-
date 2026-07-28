let loginForm = document.getElementById("login-form");

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);

  try {
    const res = await fetch("./front_api/login.php", {
      method: "POST",
      body: data,
    });

    console.log(res);
    const mensaje = await res.text();

    if (mensaje === "OK") {
      window.location.href = "./../front_api/test.php";
    } else {
      alert(mensaje);
    }
  } catch (error) {
    console.log(error);
  }
};
