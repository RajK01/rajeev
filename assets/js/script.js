// Smooth scrolling for navigation menu links
var navMenuAnchorTags = document.querySelectorAll('.navigation-menu a');
var interval;

for (let i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);

        interval = setInterval(function () {
            scrollVertically(targetSection);
        }, 10);
    });
}

function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}

// Back-to-top button functionality
const topbtn = document.querySelector('#topbtn');

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
    topbtn.style.display = document.documentElement.scrollTop > 20 ? 'block' : 'none';
});

// Smooth scrolling back to the top
topbtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll progress bar
var scrollbar = document.getElementById('scroll-bar');

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.body.offsetHeight, D.body.clientHeight
    );
}

var docHeight = getDocHeight();
var windowHeight = window.innerHeight;

window.addEventListener('scroll', function () {
    var scrolled = Math.floor((window.scrollY / (docHeight - windowHeight)) * 100);
    scrollbar.style.width = scrolled + '%';
});

// Skills progress bar initialization and animation
var progressBars = document.querySelectorAll(".skill-progress > a > div");

function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}

function fillBar(bar) {
    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 10);
}

function checkScroll() {
    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }
    }
}

window.addEventListener("scroll", checkScroll);

// EmailJS form submission
emailjs.init("Zy5eDz71D4q2P-aux"); // Replace with your actual public key

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    var name = document.getElementById('input-name').value;
    var email = document.getElementById('input-email').value;
    var message = document.getElementById('input-message').value;

    // Use the emailjs.send() method to send the email
    emailjs.send("service_ilfvkkm", "template_id", {
        from_name: name,
        from_email: email,
        message: message
    }).then(function (response) {
        console.log("SUCCESS", response);
        alert("Message sent successfully!");
    }).catch(function (error) {
        console.error("FAILED", error);
        alert("Failed to send message. Please try again.");
    });
});

// Set initial width for skill bars
document.querySelectorAll('.skill-progress div').forEach(skill => {
    const barWidth = skill.getAttribute('data-bar-width');
    if (barWidth) {
        skill.style.width = `${barWidth}%`;
    }
});

window.addEventListener("scroll", checkScroll);

// Uncomment this line if you want the progress bars to fill on page load
// window.addEventListener("load", checkScroll);
