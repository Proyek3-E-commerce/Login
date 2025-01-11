// Fungsi untuk menangani proses registrasi
function validateRegister(event) {
    event.preventDefault(); // Mencegah halaman refresh saat form disubmit
  
    // Ambil nilai input dari form
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;
  
    // Validasi sederhana
    if (!fullname || !email || !password || !userType) {
      alert("Please fill in all the fields.");
      return;
    }
  
    // Buat objek data registrasi
    const registerData = {
      fullname: fullname,
      email: email,
      password: password,
      userType: userType,
    };
  
    // Kirim data registrasi ke backend menggunakan fetch
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData), // Data dikirim dalam format JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parsing respons JSON dari backend
      })
      .then((data) => {
        console.log("Respons backend:", data); // Debug respons
  
        if (data.status === "success") {
          alert("Registration successful! Please log in.");
          window.location.href = "login.html"; // Arahkan ke halaman login
        } else {
          alert(`Registration failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error pada fetch:", error);
        alert("An error occurred during registration. Please try again later.");
      });
  }
  
  // Event listener untuk form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", validateRegister);
  }
  