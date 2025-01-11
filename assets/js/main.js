/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate if the variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Add the show-menu class to the div with the class nav__menu
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MOBILE MENU ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACTIVE SECTION LINK ON SCROLL ====================*/
const sections = document.querySelectorAll('section[id]')

function setActiveLink() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', setActiveLink)

/*==================== SHOW BACK TO TOP BUTTON ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is greater than 200px from the viewport, we add the show-scroll class to the scroll-top link
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const themeIcon = 'bx-sun'

// Previously selected theme (if the user has chosen one)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Get the current theme that the interface is using by checking the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(themeIcon) ? 'bx-moon' : 'bx-sun'

// Check if the user has selected a theme before
if (selectedTheme) {
    // If true, we check what was chosen to know if we activate or deactivate the dark theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](themeIcon)
}

// Manually activate/deactivate theme with the button
themeButton.addEventListener('click', () => {
    // Toggle dark theme / theme icon
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(themeIcon)
    // Save the current theme and icon the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== REDUCE SIZE AND PRINT ON A4 SHEET ====================*/
function reduceCv() {
    document.body.classList.add('scale-cv')
}

/*==================== REMOVE SIZE WHEN CV IS DOWNLOADED ====================*/
function removeReduce() {
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/
// Area generated for the PDF
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

// Html2pdf options
let opt = {
    margin: 0,
    filename: 'Resume_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
}

// Function to call areaCv and html2pdf options
function generateResume() {
    html2pdf(areaCv, opt)
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {

    // 1. The .scale-cv class is added to the body, reducing the size of the elements
    reduceCv()

    // 2. The PDF is generated
    generateResume()

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size
    setTimeout(removescale, 5000)
})
