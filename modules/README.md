# Course Modules Structure

This directory contains modular course content organized by modules.

## File Organization

Each module is in its own file for better maintainability:

- `module0-prerequisites.js` - Interview framework, estimation, data structures ✅ COMPLETE (NEW)
- `module1-foundations.js` - Core system design foundations ✅ COMPLETE
- `module2-networking.js` - Load balancing, DNS, CDN (in main courses.js)
- `module3-caching.js` - Caching strategies and implementation (in main courses.js)
- `module4-databases-1.js` - Database foundations (in main courses.js)
- `module5-databases-2.js` - Advanced database topics (in main courses.js)
- `module6-message-queues.js` - Async processing and event systems ✅ COMPLETE
- `module7-apis.js` - API design and communication ✅ COMPLETE
- `module8-microservices.js` - Microservices architecture ✅ COMPLETE
- `module9-advanced-patterns.js` - Advanced system design patterns ✅ COMPLETE
- `module10-observability.js` - Monitoring, logging, security ✅ COMPLETE
- `module11-real-designs.js` - Real-world system designs ✅ COMPLETE

## Notes

The main `courses.js` file contains all existing content. New modules are being
added to separate files in this directory. The module files define global objects
(e.g., `module6MessageQueues`) that are loaded via script tags in index.html.

## Linking Between Lessons

To reference other lessons in content, use relative IDs:
- Same module: Just use the lesson ID
- Different module: Use module-name/lesson-id format

Example:
```html
<p>As we learned in <a href="#scalability-101">Scalability 101</a>...</p>
```

## Content Guidelines

Each lesson should include:
1. **Comprehensive explanation** with real-world context
2. **Code blocks** showing architecture/examples
3. **Tables** for comparisons
4. **Real company examples** (Netflix, Google, Amazon, etc.)
5. **Interview questions** (4-5) with detailed answers
