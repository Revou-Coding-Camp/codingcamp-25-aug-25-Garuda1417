// Function to prompt for username
function greet() {
    let username = prompt("Silahkan masukan nama anda");
    
    // If user cancels or enters empty name, use default
    if (username === null || username.trim() === "") {
        username = "Guest";
    }
    
    document.getElementById('username').innerText = username;
}

// Function to validate form (if needed elsewhere)
function validateForm() {
    let name = document.getElementById('username').value;
    if (name === "") {
        alert("harus memasukan nama");
        return false;
    }
    return true;
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Prompt for username when page loads
    greet();
    
    // Set up navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission event listener
const form = document.getElementById('contact-form');
const messageDisplay = document.getElementById('message-display');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = form.name.value.trim();
    const dobRaw = form.dob.value;
    const gender = form.gender.value;
    const message = form.message.value.trim();

    // Validate date format presence (HTML date input handles this mostly)
    if (!dobRaw) {
        alert('Tanggal Lahir wajib diisi.');
        return;
    }

    // Format date to dd/mm/yyyy
    function formatDate(dateStr) {
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj)) return dateStr;
        return [dateObj.getDate().toString().padStart(2, '0'), 
                (dateObj.getMonth()+1).toString().padStart(2, '0'), 
                dateObj.getFullYear()].join('/');
    }

    const dobFormatted = formatDate(dobRaw);

    // Current time in format: Fri Jun 17 2022 11:27:28 GMT+0100
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day:'numeric', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZoneName: 'short' };
    const currentTime = now.toLocaleString('en-US', options);

    // Create message text content
    const output =
`Current time : ${currentTime}
Nama : ${name}
Tanggal Lahir : ${dobFormatted}
Jenis Kelamin : ${gender}
Pesan : ${message}`;

    // Show message in message display
    messageDisplay.textContent = output;

    // For better accessibility focus on message display after submit
    messageDisplay.focus();

    // Optionally: Reset form after submission
    // form.reset();
});