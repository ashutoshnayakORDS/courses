# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side learning platform built with vanilla JavaScript, HTML, and CSS. It displays educational courses with lessons, interview questions, and progress tracking. The application is entirely static with no backend - all course content is stored in JavaScript objects and rendered dynamically.

## Architecture

### Multi-Page SPA Structure

The application uses a single HTML page (index.html) with multiple logical "pages" that are shown/hidden via JavaScript:

- **home-page**: Displays course grid
- **contents-page**: Shows course details and lesson list
- **lesson-page**: Displays lesson content, interview questions, and navigation

Navigation is managed through a state-based system in `navigation.js` that tracks:
- `currentCourse`: The active course object
- `currentModule`: Current module index
- `currentLessonIdx`: Current lesson index within module
- `allLessons`: Flattened array of lessons for navigation

### Module Responsibilities

**courses.js**
- Contains all course data in a single `courses` object
- Structure: `courses[courseId].modules[].lessons[]`
- Each lesson contains: `id`, `title`, `duration`, `content` (HTML string), `interviews[]`

**navigation.js**
- Manages global state (currentCourse, currentModule, currentLessonIdx)
- Page transition functions: `showHome()`, `showCourse(courseId)`, `showLesson(courseId, moduleIdx, lessonIdx)`
- Back button logic and state updates

**renderers.js**
- Pure rendering functions that convert data to HTML
- `renderHome()`: Generates course cards
- `renderContents(courseId)`: Generates module/lesson list
- `renderLesson()`: Displays lesson content and navigation
- `renderInterviewQuestions(interviews)`: Creates accordion UI
- `toggleAccordion(header)`: Handles interview question expand/collapse

**theme.js**
- Dark/light mode toggle with localStorage persistence
- Applies `.dark-mode` class to body element

**interviews.js**
- Currently minimal - reserved for future interview-specific logic

### State Flow

```
User clicks course → showCourse() → updates currentCourse → renderContents() → showPage('contents-page')
User clicks lesson → showLesson() → updates currentCourse/Module/LessonIdx → renderLesson() → showPage('lesson-page')
User clicks back → goBack() → determines previous state → navigates accordingly
```

## How to Work with This Codebase

### Running the Application

This is a static site with no build process. Simply open `index.html` in a browser:

```bash
open index.html
```

Or use a local server:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

### Adding New Content

**To add a new course:**

Edit `courses.js` and add a new entry to the `courses` object:

```javascript
'new-course-id': {
    title: 'Course Title',
    duration: 'X weeks',
    level: 'Beginner/Intermediate/Advanced',
    modules: [/* ... */]
}
```

**To add a new lesson:**

Add to the `lessons` array within a module in `courses.js`:

```javascript
{
    id: 'unique-lesson-id',
    title: 'Lesson Title',
    duration: 'XX min',
    content: `<h2>Content</h2><p>HTML content here...</p>`,
    interviews: [
        {
            question: 'Question text?',
            answer: 'Answer text'
        }
    ]
}
```

### Styling Conventions

- Dark mode is controlled via `.dark-mode` class on body
- All styles have both light and dark mode variants
- Color scheme: Light mode uses white (#ffffff) bg with black (#000000) text; dark mode inverts this
- Consistent spacing: 1rem base unit
- Box shadows: `0 2px 8px rgba(0,0,0,0.1)` for light, inverted for dark

### Important Constraints

- **No backend**: All data must be in `courses.js`
- **No build process**: All code must work directly in the browser
- **Inline HTML in JS**: Lesson content is stored as HTML strings in JavaScript
- **Global functions**: onClick handlers in HTML reference global functions (e.g., `showCourse()`, `toggleAccordion()`)

## Code Patterns

### Content HTML Structure

Lesson content uses specific class names for consistent styling:

- `.code-block`: Pre-formatted code/text blocks
- `.table`: Tables with responsive styling
- Standard HTML: `<h2>`, `<h3>`, `<h4>`, `<p>`, `<ul>`, `<ol>`

### Adding Interview Questions

Interview questions use an accordion pattern. Each question/answer is an object in the lesson's `interviews` array. The `renderInterviewQuestions()` function automatically creates the accordion UI.

### Navigation State Management

When navigating between pages, always:
1. Update relevant state variables (currentCourse, etc.)
2. Call the appropriate render function
3. Call `showPage(pageId)` to switch visible page
4. Call `updateBackButton()` to show/hide back button

## File Dependencies

Load order in `index.html` matters:

1. `theme.js` - Loads first to prevent flash of unstyled content
2. `courses.js` - Data must be available before rendering
3. `navigation.js` - State management needed by renderers
4. `renderers.js` - Rendering functions
5. `interviews.js` - Currently minimal, loaded last
