"use strict"
/* HAMBURGER MENU */
const navLinks = document.querySelector(".nav-links")
const hamburger = document.querySelector(".hamburger")

if (hamburger && navLinks) {
    const setMenuOpen = (isOpen) => {
        navLinks.classList.toggle("active")
        hamburger.classList.toggle("active")
        document.body.classList.toggle("menu-open", isOpen)
        // hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false")
    }

    hamburger.addEventListener("click", () => {
        setMenuOpen(!navLinks.classList.contains("active"))
    })  

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false))
    })
}

// HERO BANNER SLIDER
let heroSlides = [];
let heroPrevBtn = undefined;
let heroNextBtn = undefined;
let heroDotsContainer = null;
let heroCurrentSlide = 0;
let heroAutoPlayInterval = null;

function heroInit() {
    heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
    heroPrevBtn = document.querySelector('.prevbtn');
    heroNextBtn = document.querySelector('.nextbtn');
    heroDotsContainer = document.getElementById('sliderDots');


    heroSlides.forEach((slide) => {
        const imageUrl = slide.getAttribute('data-image');
        // if (imageUrl) slide.style.backgroundImage = `url("${imageUrl}")`;
        if (imageUrl) {
            slide.style.backgroundImage = `url("${imageUrl}")`;
        }
        
    });

    heroCreateDots();
    heroShowSlide(0);
    heroAddEventListeners();
    heroStartAutoPlay();
}

function heroCreateDots() { 
    heroSlides.forEach((curr, i) => {
        /* heroSlides is an array that contains all your slides.

        Example:
        heroSlides = [slide1, slide2, slide3]

        So this forEach means:
        Go through every slide one by one and do something for each one */
        const dot = document.createElement('div');//Here i created a new div
        /* For every single slide, we are creating a NEW dot.

            Important idea:
            - This is NOT using existing HTML dots
            - We are building dots dynamically using JavaScript

            So every loop creates something like:
            <div></div> */
        dot.classList.add('dot');// Give the Created div a class name
        /* We give the dot a class name called "dot"

            Why?
            Because CSS uses this class to:
            - make it round
            - set size
            - set color
            - add spacing

            So this turns:
            <div></div>

            into:
            <div class="dot"></div> */
        if (i === 0) dot.classList.add('active');
        /*  This line means:

            "If this is the FIRST slide (index 0),
             then make its dot active when the page loads"

            Why only i === 0?

            Because when the slider starts:
            - slide 0 is visible first
            - so its dot should also look active

            So only this one becomes:
            <div class="dot active"></div>

            Others remain:
            <div class="dot"></div> */
        dot.addEventListener('click', () => heroShowSlide(i));
        /* This makes each dot clickable.

            When you click a dot:
            - it calls heroShowSlide(i)

            That means:
            "Go to the slide that matches this dot"

            Example:
            If i = 2, clicking this dot will do:
            heroShowSlide(2)

            So it jumps to slide 3 (because index starts from 0) */
        heroDotsContainer.appendChild(dot);
        /* This is the moment the dot actually appears on the screen.

            Without this line:
            - dot exists in memory only
            - user will NOT see it

            With this line:
            - dot is inserted into the HTML container

            So after running 3 times, HTML becomes:

            <div id="sliderDots">
                <div class="dot active"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> */
    });
}

function heroAddEventListeners() {
    heroPrevBtn.addEventListener('click', heroPrevSlide);
    /* Connect the Previous button to the function
        that moves the slider backward.

        When the user clicks the Previous button,
        heroPrevSlide() will run. */
    heroNextBtn.addEventListener('click', heroNextSlide);
    /* Connect the Next button to the function
        that moves the slider forward.

        When the user clicks the Next button,
        heroNextSlide() will run. */

    const heroSliderEl = document.querySelector('.hero-slider');
    /* Get the main slider container so we can
        listen for mouse events on it. */
    heroSliderEl.addEventListener('mouseenter', heroStopAutoPlay);
    /*  When the mouse enters the slider area,
        pause the automatic slide movement.

        This gives the user time to read content
        without the slide changing. */
    heroSliderEl.addEventListener('mouseleave', heroStartAutoPlay);
    /* When the mouse leaves the slider area,
        restart automatic slide movement. */
}

function heroShowSlide(index) {
    /* Show only the slide whose index was passed in.

    Process:

    1. Remove active class from all slides.
    2. Remove active class from all dots.
    3. Add active class to the selected slide.
    4. Add active class to the matching dot.
    5. Update heroCurrentSlide so the slider knows which slide is currently visible. */
    heroSlides.forEach((slide) => slide.classList.remove('active'));
    document.querySelectorAll('.dot').forEach((dot) => dot.classList.remove('active'));

    heroSlides[index].classList.add('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    heroCurrentSlide = index;
}

function heroNextSlide() {
    const nextIndex = (heroCurrentSlide + 1) % heroSlides.length;
    heroShowSlide(nextIndex);
}

function heroPrevSlide() {
    const prevIndex = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
    heroShowSlide(prevIndex);
}

function heroStartAutoPlay() {
    heroStopAutoPlay();
    heroAutoPlayInterval = setInterval(heroNextSlide, 5000);
}

function heroStopAutoPlay() {
    if (heroAutoPlayInterval) {
        clearInterval(heroAutoPlayInterval);
        heroAutoPlayInterval = null;
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', heroInit);

// ============================================
// MEMBERS AND EVENTS
// ============================================

const members = [
    {
        id: 1,
        fullName: "Temenu Victure",
        status: "SENIOR MANAGER",
        sponsorName: "MR MIRACLE OLUWAFEMI",
        uplineName: "MR AMISU",
        picture: "images/ass leader pic1.jpeg"
    },

    {
        id: 2,
        fullName: "Amaka Nwosu",
        status: "SENIOR MANAGER",
        sponsorName: "Chukwuemeka Obi",
        uplineName: "Sarah Adeyemi",
        picture: ""
    },

    {
        id: 3,
        fullName: "Femi Adeyinka",
        status: "MANAGER",
        sponsorName: "Sarah Adeyemi",
        uplineName: "Michael Eze",
        picture: ""
    },

    {
        fullName: "Sarah Adeyemi",
        status: "DISTRIBUTOR",
        sponsorName: "Michael Eze",
        uplineName: "James Okonkwo",
        picture: ""
    }
]

const events = [
    {
        id: 1,
        title: "Monthly Cheque Rally",
        date: "2026-06-28",
        venue: "Victoria Island",
        description: "Monthly cheque rally",
        picture: "images/ASS pic.jpeg"
    },

    {
        id: 2,
        title: "Monthly Cheque Rally",
        date: "2026-06-28",
        venue: "Victoria Island",
        description: "Monthly cheque rally",
        picture: "images/ASS pic.jpeg"
    },
     
    {
        id: 3,
        title: "Monthly Cheque Rally",
        date: "2026-01-06",
        venue: "Victoria Island",
        description: "Monthly cheque rally",
        picture: "images/ASS pic.jpeg"
    },

    {
        id: 4,
        title: "Monthly Cheque Rally",
        date: "2026-06-18",
        venue: "Victoria Island",
        description: "Monthly cheque rally",
        picture: "images/ASS pic.jpeg",
    }
];

const membersGrid = document.getElementById('membersGrid');
const eventsGrid = document.getElementById('eventsGrid');
const rankFilter = document.getElementById("rankFilter");

function displayMembers(members) { // why did we use function here instead of const or let? Using a function allows us to define a reusable block of code that can be called with different sets of members. If we used const or let, we would be defining a variable that holds a specific value, which would not allow for the same level of flexibility and reusability as a function. By using a function, we can easily update the display of members whenever the data changes without having to rewrite the code that generates the member cards.
    membersGrid.innerHTML = '';//This is to clear the existing content in the html element before adding new content with the forEach loop. This ensures that when you call displayMembers multiple times, it doesn't keep appending new member cards to the existing ones, but instead replaces the old content with the new one.
    members.forEach(member => {
        const memberCard = document.createElement('div');// the div i created here is the container for each member's information, which will be styled as a card. By creating a new div for each member, we can easily apply CSS styles to it and organize the member's details in a visually appealing way.
        memberCard.classList.add('member-card');
        // const memberImage = member.picture
        //     ? `<img src="${member.picture}" alt="${member.fullName}" class="member-image">`
        //     : `<div class="member-placeholder">${member.fullName.charAt(0)}</div>`;
        let memberImage;
        if (member.picture) {
            memberImage = `<img src="${member.picture}" alt="${member.fullName}" class="member-image">`
        } else {
            memberImage = `<div class="member-placeholder">${member.fullName.charAt(0)}</div>`;
        }

        memberCard.innerHTML = `
            ${memberImage}
            <div class="member-card-body">
                <span class="member-status">${member.status}</span>
                <h3 class="member-name">${member.fullName}</h3>
                <p class="member-detail"><span>Sponsor:</span> ${member.sponsorName}</p>
                <p class="member-detail"><span>Upline:</span> ${member.uplineName}</p>
            </div>`;
        membersGrid.appendChild(memberCard);
    });
}

function displayEvents(events) {
    eventsGrid.innerHTML = '';
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    events.forEach(event => {
        const [year, month, day] = event.date.split('-');//now here year = "2026", month = "06", day = "06"
        const formattedDay = Number(day);//here i turn month into a number now it is 6 not "o6" the Number before the bracket(day) is afunction that turns a numberstring into a real number
        const formattedMonth = monthNames[Number(month) - 1];//perseInt is used to convert the month string into an integer, and we subtract 1 because array indices start at 0. This allows us to get the correct month abbreviation from the monthNames array based on the month number provided in the event date.

        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        const safeDescription = event.description.replace(/"/g, '&quot;').replace(/\n/g, ' ');
        eventCard.innerHTML = `
            <div class="event-image-wrapper">
                <img src="${event.picture}" alt="${event.title}" class="event-image">
                <div class="event-badge">UPCOMING</div>
            </div>
            <div class="event-card-body">
                <div class="event-date">
                    <span class="event-day">${formattedDay}</span>
                    <span class="event-month-year">${formattedMonth} ${year}</span>
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <div class="event-venue"><i class="fa-solid fa-location-dot"></i>${event.venue}</div>
                    <p class="event-description" title="${safeDescription}">${event.description}</p>
                </div>
            </div>`;
        eventsGrid.appendChild(eventCard);//Put the element eventCard inside eventsGrid  
    });
}

displayMembers(members);
displayEvents(events);

const addEventBtn = document.getElementById('openEventModal');
const eventModal = document.getElementById('eventModal');
const closeEventBtn = document.getElementById('closeEventModal');
const cancelEventBtn = document.getElementById('cancelEventBtn');
const eventForm = document.getElementById('eventForm');
const eventFlyerInput = document.getElementById('eventFlyer');
// const eventFlyerLabel = document.getElementById('eventFlyerLabel');
const flyerText = document.getElementById('flyer-text');

function resetEventFlyer() {
    eventFlyerInput.value = '';
    flyerText.textContent = 'Upload event flyer';
}

function showEventModal() {
    eventModal.classList.remove('hidden');
    // memberModal.classList.remove("hidden")
    document.body.classList.add('modal-open');
}

function hideEventModal() {
    eventModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    eventForm.reset();
    resetEventFlyer();
}

addEventBtn.addEventListener('click', showEventModal);
closeEventBtn.addEventListener('click', hideEventModal);
cancelEventBtn.addEventListener('click', hideEventModal);

// addEventBtn.addEventListener('click', () => {
//     eventModal.classList.remove('hidden');
//     document.body.classList.add('modal-open');
// });

eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal) {//tergeting the modal itself ensures that the modal will only close when the user clicks outside of the form, preventing accidental closures when interacting with the form elements.
        hideEventModal();
    }
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEvent = { // Now here i create a new object why did i create a new object for event. you know this a form and we want to let people to fill the form and we want to get thier info and add it to the UI So i target each field 
        id: events.length + 1,
        title: document.getElementById('eventTitle').value,//This is the title of the event we target the title field that document.getElementById('eventTitle').value .value allow us to get whatever the user has typed in that input field so when .value get what the user type in the field then we set as a key value for title:
        //So that what we do here 
        /* Think of it like this:

            User fills the form.
            User clicks Submit.
            JavaScript catches that submit.
            JavaScript collects all the form data.
            JavaScript creates a new event object.
            JavaScript adds it to the events array.
            JavaScript re-renders the UI.
            JavaScript clears the form.
            JavaScript closes the modal. */
        date: document.getElementById('eventDate').value,
        venue: document.getElementById('eventVenue').value,
        description: document.getElementById('eventDescription').value || '',
        picture: eventFlyerInput.files[0] ? URL.createObjectURL(eventFlyerInput.files[0]) : '' 
        // eventFlyerInput.files contains all files selected by the user.

    // eventFlyerInput.files[0] gets the first selected file.
    // It returns a File object like:
    //
    // File {
    //     name: "church-flyer.jpg",
    //     size: 250000,
    //     type: "image/jpeg"
    // }
    //
    // This File object is not a URL and cannot be used directly
    // as an image source.
    //
    // URL.createObjectURL(eventFlyerInput.files[0])
    // creates a temporary blob URL for that file, such as:
    //
    // blob:http://127.0.0.1:5503/abc123
    //
    // This temporary URL can then be used inside an <img> element
    // to display the selected image immediately without uploading it
    // to a server.
    };
    // console.log(URL.createObjectURL(eventFlyerInput.files[0]))
    events.unshift(newEvent);//so that new array we created we are now adding it to the event array that is when user fill the form you know that new array is for the form it will added to the event array
    displayEvents(events);
    eventForm.reset();
    hideEventModal();

});

// eventFlyerLabel.addEventListener('click', () => {
//     eventFlyerInput.click();
// });
eventFlyerInput.addEventListener('change', () => {
    // The "change" event fires whenever the user selects
    // a new file from the file picker.
    if (eventFlyerInput.files.length) {
        // eventFlyerInput.files contains all selected files.
        // .length checks how many files were selected.
        // If the value is greater than 0, it means a file exists.

        // eventFlyerInput.files[0] gets the first selected file.
        // .name gets the file's name (e.g. "church-flyer.jpg").

        // flyerText is the span that displays
        // "Upload event flyer" to the user.
        // We replace that text with the selected file name
        // so the user can see which file they picked.
        flyerText.textContent = eventFlyerInput.files[0].name;
    }
});

// eventFlyerLabel.querySelector('span:last-of-type')

const addMemberBtn = document.getElementById("openMemberModal")
const memberModal = document.getElementById("memberModal")
const closeMemberBtn = document.getElementById("closeMemberModal")
const cancelMemberBtn = document.getElementById("cancelMemberBtn")
const memberForm = document.getElementById("memberForm")
const memberPhotoInput = document.getElementById("memberPhoto")
const uploadPhotoBtn = document.getElementById("upload-photo-btn")
const photoPreviewContainer = document.querySelector('.join-photo-preview')

function openMemberModal() {
    memberModal.classList.remove("hidden")
    document.body.classList.add("modal-open")
}

function closeMemberModal() {
    memberModal.classList.add("hidden")
    document.body.classList.remove("modal-open")
    memberForm.reset()
    // photoPreviewContainer.innerHTML = '<div class="photo-placeholder"></div>'
}

addMemberBtn.addEventListener("click", openMemberModal)
closeMemberBtn.addEventListener("click", closeMemberModal)
cancelMemberBtn.addEventListener("click", closeMemberModal)

uploadPhotoBtn.addEventListener("click", () => {
    memberPhotoInput.click()
    
})

memberPhotoInput.addEventListener("change", () => {
    // The "change" event runs whenever the user selects
    // a new image from the file picker.
    if (memberPhotoInput.files.length) {
        // The files property contains all selected files.
        // [0] gets the first selected file.
        // The result is a File object representing the image.
        const file = memberPhotoInput.files[0]
        // The File object itself cannot be displayed directly
        // inside an <img> tag.
        //
        // URL.createObjectURL() creates a temporary URL
        // (blob URL) that points to the selected image.
        //
        // Example:
        // blob:http://localhost/abc123
        const imageUrl = URL.createObjectURL(file)
        // Insert an <img> element into the preview container.
        // The src attribute is set to the temporary URL,
        // allowing the selected image to be displayed
        // immediately without uploading it to a server.
        photoPreviewContainer.innerHTML = `\
            <img src="${imageUrl}" alt="Member photo" class="photo-preview-image" />\
        `
    }
})

/*  id: 1,
fullName: "Chukwuemeka Obi",
status: "EXECUTIVE MANAGER",
sponsorName: "James Okonkwo",
uplineName: "James Okonkwo",
picture: "images/leader Pic.jpeg"  */

memberForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const newMember = {
        id: members.length + 1,
        fullName: document.getElementById("memberName").value,
        status: document.getElementById("memberStatus").value,
        sponsorName: document.getElementById("sponsorName").value,
        uplineName: document.getElementById("uplineName").value,
        picture: memberPhotoInput.files[0] ? URL.createObjectURL(memberPhotoInput.files[0]) : ""
    }
    
    members.push(newMember)
    memberForm.reset()
    photoPreviewContainer.innerHTML = '<div class="photo-placeholder">👤</div>'
    displayMembers(members)
    document.body.classList.remove("modal-open")
    memberModal.classList.add("hidden")
})

/* Drop-down 
//when user select
//get the value of the slected option
//filter the membters array
//re-render it(update the UI ) 
*/
rankFilter.addEventListener("change", () => {
    const selectedRank = rankFilter.value
    let filteredMembers;
    if(selectedRank === "ALLMEMBERS"){
        filteredMembers = members
    }else{
        filteredMembers = members.filter((memberfilter) => memberfilter.status === selectedRank)
    }
    displayMembers(filteredMembers)
})

