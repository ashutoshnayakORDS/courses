// Rendering functions for different pages

function renderHome() {
    const grid = document.getElementById('courses-grid');
    grid.innerHTML = Object.keys(courses).map(courseId => {
        const course = courses[courseId];
        return `
            <div class="course-card" onclick="showCourse('${courseId}')">
                <h3>${course.title}</h3>
                <p>${course.duration} - ${course.level}</p>
                <p class="course-meta">${course.modules.length} modules</p>
            </div>
        `;
    }).join('');
}

function renderContents(courseId) {
    const course = currentCourse;
    let html = `
        <h1>${course.title}</h1>
        <p>${course.duration} - ${course.level}</p>
        <div class="contents-info">
            <div><strong>Duration:</strong> ${course.duration}</div>
            <div><strong>Level:</strong> ${course.level}</div>
            <div><strong>Modules:</strong> ${course.modules.length}</div>
        </div>
    `;

    course.modules.forEach((module, moduleIdx) => {
        html += `<div class="contents-module">`;
        html += `<h2>${module.title}</h2>`;
        html += '<div class="contents-lessons">';
        module.lessons.forEach((lesson, lessonIdx) => {
            html += `
                <div class="contents-lesson-item" onclick="showLesson('${courseId}', ${moduleIdx}, ${lessonIdx})">
                    <h3>${lesson.title}</h3>
                    <span class="lesson-meta">${lesson.duration}</span>
                </div>
            `;
        });
        html += '</div>';
        html += '</div>';
    });

    document.getElementById('contents-content').innerHTML = html;
}

function renderLesson() {
    const lesson = allLessons[currentLessonIdx];
    const progress = ((currentLessonIdx + 1) / allLessons.length) * 100;
    const courseId = Object.keys(courses).find(k => courses[k] === currentCourse);

    // Render sidebar
    renderSidebar(courseId);

    document.getElementById('lesson-header').innerHTML = `
        <h1>${lesson.title}</h1>
        <p>${lesson.duration}</p>
    `;

    document.getElementById('lesson-content').innerHTML = lesson.content;

    // Render interview questions
    renderInterviewQuestions(lesson.interviews);

    let navHtml = '';

    if (currentLessonIdx > 0) {
        navHtml += `<button onclick="showLesson('${courseId}', ${currentModule}, ${currentLessonIdx - 1})">← Previous</button>`;
    }

    navHtml += `<div class="lesson-progress">Lesson ${currentLessonIdx + 1} / ${allLessons.length}</div>`;

    if (currentLessonIdx < allLessons.length - 1) {
        navHtml += `<button onclick="showLesson('${courseId}', ${currentModule}, ${currentLessonIdx + 1})">Next →</button>`;
    }

    document.getElementById('lesson-nav').innerHTML = navHtml;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function renderSidebar(courseId) {
    const course = currentCourse;
    let sidebarHtml = '';

    course.modules.forEach((module, moduleIdx) => {
        sidebarHtml += `<div class="sidebar-module">`;
        sidebarHtml += `<div class="sidebar-module-title">${module.title}</div>`;
        sidebarHtml += '<div class="sidebar-lessons">';

        module.lessons.forEach((lesson, lessonIdx) => {
            const isActive = moduleIdx === currentModule && lessonIdx === currentLessonIdx;
            const activeClass = isActive ? 'active' : '';
            sidebarHtml += `
                <div class="sidebar-lesson ${activeClass}" onclick="showLesson('${courseId}', ${moduleIdx}, ${lessonIdx})">
                    ${lesson.title}
                </div>
            `;
        });

        sidebarHtml += '</div>';
        sidebarHtml += '</div>';
    });

    document.getElementById('sidebar-content').innerHTML = sidebarHtml;
}

function renderInterviewQuestions(interviews) {
    const container = document.getElementById('interview-questions');
    
    if (!interviews || interviews.length === 0) {
        container.innerHTML = '<p style="color: #999; font-size: 0.9rem;">No interview questions for this lesson yet.</p>';
        return;
    }

    container.innerHTML = interviews.map((q, idx) => `
        <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
                <span>${q.question}</span>
                <span class="accordion-toggle">▼</span>
            </button>
            <div class="accordion-body">
                <div class="accordion-content">
                    ${q.answer}
                </div>
            </div>
        </div>
    `).join('');
}

function toggleAccordion(header) {
    header.classList.toggle('active');
    const body = header.nextElementSibling;
    body.classList.toggle('active');
}
