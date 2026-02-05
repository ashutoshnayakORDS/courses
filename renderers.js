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
    // Calculate global lesson index across all modules
    let globalLessonIdx = 0;
    for (let m = 0; m < currentModule; m++) {
        globalLessonIdx += currentCourse.modules[m].lessons.length;
    }
    globalLessonIdx += currentLessonIdx;

    const lesson = allLessons[globalLessonIdx];
    const progress = ((globalLessonIdx + 1) / allLessons.length) * 100;
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

    // Previous button
    if (globalLessonIdx > 0) {
        const prevPosition = findModuleAndLessonIdx(globalLessonIdx - 1);
        navHtml += `<button onclick="showLesson('${courseId}', ${prevPosition.moduleIdx}, ${prevPosition.lessonIdx})">← Previous</button>`;
    }

    navHtml += `<div class="lesson-progress">Lesson ${globalLessonIdx + 1} / ${allLessons.length}</div>`;

    // Next button
    if (globalLessonIdx < allLessons.length - 1) {
        const nextPosition = findModuleAndLessonIdx(globalLessonIdx + 1);
        navHtml += `<button onclick="showLesson('${courseId}', ${nextPosition.moduleIdx}, ${nextPosition.lessonIdx})">Next →</button>`;
    }

    document.getElementById('lesson-nav').innerHTML = navHtml;
    document.getElementById('progress-fill').style.width = progress + '%';
}

// Helper function to find module and lesson index from global index
function findModuleAndLessonIdx(globalIdx) {
    let count = 0;
    for (let moduleIdx = 0; moduleIdx < currentCourse.modules.length; moduleIdx++) {
        const moduleLessons = currentCourse.modules[moduleIdx].lessons.length;
        if (count + moduleLessons > globalIdx) {
            return {
                moduleIdx: moduleIdx,
                lessonIdx: globalIdx - count
            };
        }
        count += moduleLessons;
    }
    return { moduleIdx: 0, lessonIdx: 0 };
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
