let loginForm = document.getElementById("login-form");
let showPswrdBtn = document.getElementById('show-pswrd-btn')

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);

  try {
    const res = await fetch("./../../../api/auth/login.php", {
      method: "POST",
      body: data,
    });

    console.log(res);
    const mensaje = await res.text();

    if (mensaje === "OK") {
      window.location.href = "./../app.html";
    } else {
      const alertError = document.getElementById("alert-error");

      if (!alertError.classList.contains('active')){
        alertError.classList.add('active')
      }
      setTimeout(() => {
        document.getElementById("alert-error").classList.remove('active');
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
};

showPswrdBtn.addEventListener('click', ()=>{
  const passwordInput = document.getElementById('login-psswrd');
  const showPswrdImg = document.getElementById('show-pswrd-img');
  
  if (passwordInput.type === "password"){
    passwordInput.type = "text";
    showPswrdImg.src = "assets/images/hide.png"
  } else if (passwordInput.type === "text"){
    passwordInput.type = "password";
    showPswrdImg.src = "assets/images/show.png"
  }
})