// State management
let currentCourse = null;
let currentModule = null;
let currentLessonIdx = null;
let allLessons = [];
let currentCourseId = null;

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);

    // Update body class for mobile styling
    if (pageId === 'lesson-page') {
        document.body.classList.add('lesson-active');
    } else {
        document.body.classList.remove('lesson-active');
    }
}

function showHome() {
    currentCourse = null;
    currentCourseId = null;
    renderHome();
    showPage('home-page');
    updateBackButton();
}

function showCourse(courseId) {
    // Skip contents page - go directly to first lesson
    showLesson(courseId, 0, 0);
}

function showLesson(courseId, moduleIdx, lessonIdx) {
    currentCourse = courses[courseId];
    currentCourseId = courseId;
    currentModule = moduleIdx;
    currentLessonIdx = lessonIdx;
    allLessons = currentCourse.modules[moduleIdx].lessons;
    renderLesson();
    renderCourseMenu(courseId);
    showPage('lesson-page');
    updateBackButton();
}

function goBack() {
    // Since we skip contents page, always go back to home from lessons
    showHome();
}

function updateBackButton() {
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = currentCourse !== null ? 'block' : 'none';
}

// Mobile course menu functions
function openCourseMenu() {
    const overlay = document.getElementById('course-menu-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCourseMenu(event) {
    // If event exists and target is not the overlay background, don't close
    if (event && event.target !== event.currentTarget) return;

    const overlay = document.getElementById('course-menu-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCourseMenu(courseId) {
    const course = courses[courseId];
    if (!course) return;

    let html = '';

    course.modules.forEach((module, moduleIdx) => {
        html += `<div class="course-menu-module">`;
        html += `<h4 class="course-menu-module-title">${module.title}</h4>`;
        html += '<div class="course-menu-lessons">';

        module.lessons.forEach((lesson, lessonIdx) => {
            const isActive = moduleIdx === currentModule && lessonIdx === currentLessonIdx;
            const activeClass = isActive ? 'active' : '';
            html += `
                <button class="course-menu-lesson ${activeClass}"
                        onclick="selectLessonFromMenu('${courseId}', ${moduleIdx}, ${lessonIdx})">
                    ${lesson.title}
                </button>
            `;
        });

        html += '</div>';
        html += '</div>';
    });

    document.getElementById('course-menu-content').innerHTML = html;
}

function selectLessonFromMenu(courseId, moduleIdx, lessonIdx) {
    closeCourseMenu();
    showLesson(courseId, moduleIdx, lessonIdx);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    renderHome();
    showPage('home-page');
    updateBackButton();
});
