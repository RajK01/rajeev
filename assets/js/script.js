//for smooth scrolling
var navMenuAnchorTags = document.querySelectorAll('.navigation-menu a');
var interval;
for (let i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        //    interval = setInterval(scrollVertically, 20, targetSection);
         //or we can write function like below
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

// back to top function
var intervaltop;
var topbtn = document.querySelector('#topbtn');

window.addEventListener('scroll', function(){
    if (document.documentElement.scrollTop > 20) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
});
topbtn.addEventListener('click',function(event){
    event.preventDefault();
    intervaltop = setInterval(function(){
        console.log(intervaltop)
        if(document.documentElement.scrollTop <= 0 ){
            clearInterval(intervaltop);
            return;
        }
        window.scrollBy(0,-100);
    },10)
});

// top scroll progress
var scrollbar = document.getElementById('scroll-bar');
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.body.offsetHeight, D.body.clientHeight
    );
}
var docHeight = getDocHeight();
var windowHeight = window.innerHeight;
window.addEventListener('scroll', function(){
    var scrolled = Math.floor((window.scrollY/(docHeight-windowHeight))*100);
    scrollbar.style.width = scrolled+ '%';
})

// to filling the skills bar
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



// This function uses a for loop for individual progress bars.
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

        // Initialize EmailJS with your public key (User ID)
emailjs.init("Zy5eDz71D4q2P-aux");  // Replace with your actual public key

// Send the email when the form is submitted
document.getElementById('contact-form').addEventListener('submit', function(event) {
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
    }).then(function(response) {
        console.log("SUCCESS", response);
        alert("Message sent successfully!");
    }).catch(function(error) {
        console.error("FAILED", error);
        alert("Failed to send message. Please try again.");
    });
});

window.addEventListener("scroll", checkScroll);

// This event fills the progress bars if they are displayed on the screen when the page is loaded.
// window.addEventListener("load", checkScroll);
