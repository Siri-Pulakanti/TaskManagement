# Task Management Application - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Flow Diagram](#architecture--flow-diagram)
3. [State Management](#state-management)
4. [Component Tree & Props Flow](#component-tree--props-flow)
5. [Actions & Events](#actions--events)
6. [Data Flow](#data-flow)
7. [File Structure](#file-structure)
8. [Component Documentation](#component-documentation)
9. [Hooks Documentation](#hooks-documentation)
10. [Context Documentation](#context-documentation)
11. [Utilities Documentation](#utilities-documentation)
12. [Feature Implementation](#feature-implementation)

---

## Project Overview

This is a modern React-based Task Management application built with functional components, hooks, and Context API. The application allows users to create, read, update, delete, and search tasks with real-time filtering and highlighting.

### Key Features
- ✅ CRUD operations for tasks
- ✅ Real-time search with highlighting
- ✅ Task editing using the same form
- ✅ Confirmation dialogs for deletions
- ✅ LocalStorage caching for persistence
- ✅ Priority-based color coding
- ✅ Due date status indicators
- ✅ Responsive design

---

## Architecture & Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                            APP.JS                               │
│  ┌─────────────────┐  ┌─────────────────┐                     │
│  │ editTaskData    │  │ searchQuery     │                     │
│  │ (Task | null)   │  │ (string)        │                     │
│  └─────────────────┘  └─────────────────┘                     │
│         │                       │                              │
│         ├── TaskProvider ────────┤                              │
│         │                       │                              │
│  ┌──────▼──────┐         ┌──────▼──────┐                      │
│  │  TaskForm   │         │  TaskList   │                      │
│  │             │         │             │                      │
│  └─────────────┘         └──────┬──────┘                      │
│                                 │                              │
│                          ┌──────▼──────┐                      │
│                          │  TaskCard   │                      │
│                          │             │                      │
│                          └──────┬──────┘                      │
│                                 │                              │
│                          ┌──────▼──────┐                      │
│                          │ ConfirmDialog│                      │
│                          │             │                      │
│                          └─────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      TaskContext          │
                    │   ┌─────────────────┐    │
                    │   │   useTasks()    │    │
                    │   │                 │    │
                    │   │ • tasks[]       │    │
                    │   │ • addTask()     │    │
                    │   │ • editTask()    │    │
                    │   │ • deleteTask()  │    │
                    │   └─────────────────┘    │
                    └───────────┬───────────────┘
                                │
                    ┌───────────▼───────────┐
                    │    localStorage      │
                    │    (Persistence)     │
                    └─────────────────────────┘
```

---

## State Management

### Global State (TaskContext)
```javascript
{
  tasks: Task[], // Array of all tasks
  addTask: (task: Task) => void,
  editTask: (updatedTask: Task) => void,
  deleteTask: (id: string) => void
}
```

### Local States by Component

#### App.js State
```javascript
{
  editTaskData: Task | null,    // Task being edited (null = add mode)
  searchQuery: string           // Current search term
}
```

#### TaskForm.js State
```javascript
{
  formData: {
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    category: string,
    dueDate: string,           // ISO date string
    id?: string               // Only present when editing
  },
  error: string               // Form validation error message
}
```

#### TaskCard.js State
```javascript
{
  showPopup: boolean         // Controls confirmation dialog visibility
}
```

#### TaskList.js State
```javascript
// No local state - purely derived from props and context
```

---

## Component Tree & Props Flow

```
App
├── Props: none
├── State: editTaskData, searchQuery
├── Context Provider: TaskProvider
│
├─── TaskForm
│    ├── Props: editTaskData, onSaveEdit, onCancelEdit
│    ├── State: formData, error
│    └── Context: { addTask, editTask }
│
└─── TaskList
     ├── Props: onEdit, searchQuery  
     ├── State: none
     ├── Context: { tasks, deleteTask }
     │
     └─── TaskCard (multiple)
          ├── Props: task, onDelete, onEdit, searchQuery
          ├── State: showPopup
          │
          └─── ConfirmDialog
               ├── Props: title, description, onConfirm, onCancel
               └── State: none
```

### Props Interface Definitions

```typescript
// App.js
interface AppProps {}

// TaskForm.js  
interface TaskFormProps {
  editTaskData: Task | null;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

// TaskList.js
interface TaskListProps {
  onEdit: (task: Task) => void;
  searchQuery: string;
}

// TaskCard.js
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  searchQuery: string;
}

// ConfirmDialog.js
interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Task Data Structure
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;          // ISO date string
  completed: boolean;
  createdAt: number;        // timestamp
}
```

---

## Actions & Events

### User Actions & Event Flow

#### 1. Add Task Flow
```
User fills form → clicks "Add Task" → TaskForm.handleSubmit() 
→ addTask(formData) → useTasks.addTask() → setTasks([newTask, ...prev]) 
→ localStorage.setItem() → UI re-renders with new task
```

#### 2. Edit Task Flow
```
User clicks ✏️ → TaskCard.onEdit(task) → App.handleEditRequest(task) 
→ setEditTaskData(task) → TaskForm receives editTaskData → form populates 
→ user modifies → clicks "Save Changes" → TaskForm.handleSubmit() 
→ editTask(formData) → useTasks.editTask() → setTasks(updated) 
→ onSaveEdit() → setEditTaskData(null) → form resets
```

#### 3. Delete Task Flow
```
User clicks 🗑️ → TaskCard shows ConfirmDialog → user clicks "Delete" 
→ ConfirmDialog.onConfirm() → TaskCard.onDelete(taskId) 
→ useTasks.deleteTask(id) → setTasks(filtered) → localStorage.setItem() 
→ UI re-renders without deleted task
```

#### 4. Search Flow
```
User types in search bar → App.setSearchQuery(value) → TaskList receives searchQuery 
→ tasks.filter(matching) → TaskCard.highlightText(text, query) 
→ UI shows filtered results with highlights
```

---

## Data Flow

### 1. Data Source Chain
```
localStorage ← → useTasks ← → TaskContext ← → Components
```

### 2. State Updates Chain
```
User Action → Component Event Handler → Context Action → useTasks Hook 
→ React State Update → useEffect → localStorage → UI Re-render
```

### 3. Search Data Flow
```
Search Input → App.searchQuery → TaskList.filteredTasks → TaskCard.highlightText 
→ Rendered UI with highlights
```

---

## File Structure

```
src/
├── components/
│   ├── TaskForm.js          # Form for adding/editing tasks
│   ├── TaskForm.css         # TaskForm styles
│   ├── TaskList.js          # Container for task cards with search
│   ├── TaskList.css         # TaskList styles  
│   ├── TaskCard.js          # Individual task display with actions
│   ├── TaskCard.css         # TaskCard styles
│   ├── ConfirmDialog.js     # Reusable confirmation popup
│   └── ConfirmDialog.css    # ConfirmDialog styles
├── context/
│   └── TaskContext.js       # React Context for task state
├── hooks/
│   └── useTasks.js          # Custom hook for task operations
├── utils/
│   └── Date.js              # Date formatting utilities
├── data/
│   └── constants.js         # Sample data and constants
├── App.js                   # Main app component
├── App.css                  # Global app styles
├── index.js                 # React app entry point
└── index.css               # Global CSS reset and typography
```

---

## Component Documentation

### App.js
**Purpose**: Root component managing global app state and layout

**Responsibilities**:
- Manage edit mode state (`editTaskData`)
- Manage search functionality (`searchQuery`) 
- Provide TaskContext to all children
- Handle edit request/save/cancel events
- Render main layout with header and container

**Key Functions**:
- `handleEditRequest(task)`: Sets task to edit mode
- `handleSaveEdit()`: Exits edit mode  
- `handleCancelEdit()`: Cancels edit mode

---

### TaskForm.js  
**Purpose**: Unified form for adding and editing tasks

**Responsibilities**:
- Render form inputs with validation
- Handle add/edit mode switching via `editTaskData` prop
- Validate required fields (title, dueDate)
- Submit form data to appropriate context action
- Reset form after successful operations
- Show edit indicator when in edit mode

**Key Functions**:
- `handleSubmit(e)`: Validates and submits form
- `useEffect`: Populates form when `editTaskData` changes

**Form Fields**:
- `title`: Required text input
- `description`: Optional textarea (500 char limit)  
- `priority`: Select (low/medium/high)
- `category`: Select from constants
- `dueDate`: Required date input

---

### TaskList.js
**Purpose**: Container component for rendering filtered task cards

**Responsibilities**:
- Get tasks from TaskContext
- Filter tasks based on `searchQuery` prop
- Handle empty states (no tasks, no matches)
- Pass delete/edit handlers to TaskCards
- Pass search query for highlighting

**Key Functions**:
- `tasks.filter()`: Real-time search filtering across all task fields
- Render logic for empty states vs task cards

**Search Logic**: Case-insensitive partial matching across:
- title, description, category, priority, dueDate

---

### TaskCard.js
**Purpose**: Individual task display with interactive actions

**Responsibilities**:
- Display task information with proper formatting
- Show priority-based visual indicators
- Show due date status (overdue/due-soon/normal)
- Handle edit and delete button clicks  
- Highlight search terms in displayed text
- Manage confirmation dialog for deletions

**Key Functions**:
- `highlightText(text, query)`: Renders text with highlighted search matches
- `getDueDateStatus()`: Determines due date urgency
- `formatDate()`: Formats date for display

**Visual Indicators**:
- Border color based on priority
- Due date color coding (red=overdue, yellow=due soon)
- Search term highlighting with yellow background

---

### ConfirmDialog.js
**Purpose**: Reusable confirmation popup for destructive actions

**Responsibilities**:
- Display modal confirmation dialog
- Prevent accidental deletions
- Show task-specific confirmation message
- Handle confirm/cancel actions
- Provide accessible modal behavior

**Props**: `title`, `description`, `onConfirm`, `onCancel`

---

## Hooks Documentation

### useTasks.js
**Purpose**: Custom hook managing all task-related state and operations

**State**: `tasks` array loaded from localStorage or sample data

**Methods**:

#### `addTask(task)`
- **Purpose**: Add new task to collection
- **Process**: 
  1. Generate unique ID with uuid()
  2. Add metadata (completed: false, createdAt: timestamp)
  3. Prepend to tasks array (newest first)
  4. Trigger localStorage save via useEffect

#### `editTask(updatedTask)`  
- **Purpose**: Update existing task
- **Process**:
  1. Find task by ID in array
  2. Merge updated fields with existing task
  3. Replace in tasks array
  4. Trigger localStorage save

#### `deleteTask(id)`
- **Purpose**: Remove task from collection  
- **Process**:
  1. Filter out task with matching ID
  2. Update tasks array
  3. Trigger localStorage save

**localStorage Integration**:
- `useEffect` watches `tasks` and saves to localStorage
- `loadTasksFromStorage()` handles initial load with error handling
- Graceful fallback to sample data on localStorage errors

---

## Context Documentation

### TaskContext.js
**Purpose**: Provides task state and actions to all components via React Context

**Provider**: `TaskProvider`
- **Props**: `children` (React components)
- **Value**: Complete return object from `useTasks()` hook

**Consumer**: `useTaskContext()`
- **Returns**: `{ tasks, addTask, editTask, deleteTask }`
- **Error Handling**: Throws error if used outside provider

**Benefits**:
- Eliminates prop drilling
- Centralized task state management
- Clean separation of concerns
- Easy to test and mock

---

## Utilities Documentation

### Date.js

#### `formatDate(dateString)`
- **Purpose**: Format ISO date string for user display
- **Input**: ISO date string (e.g., "2025-09-20")
- **Output**: Formatted string (e.g., "Sep 20, 2025")
- **Locale**: en-US format

#### `getDueDateStatus(dueDate)`  
- **Purpose**: Determine urgency status of due date
- **Input**: ISO date string
- **Output**: Status string
  - `"overdue"`: Due date has passed
  - `"due-soon"`: Due within 3 days
  - `"normal"`: Due more than 3 days away
- **Used for**: CSS class application and visual indicators

---

## Feature Implementation

### 1. LocalStorage Caching
- **Location**: `useTasks.js`
- **Key**: `"tasks"`  
- **Strategy**: Save on every state change, load on initialization
- **Error Handling**: Graceful fallback to sample data
- **Benefits**: Persistence across browser sessions

### 2. Real-time Search
- **Components**: App → TaskList → TaskCard
- **Strategy**: Filter on every keystroke (no debouncing)
- **Search Fields**: title, description, category, priority, dueDate  
- **Matching**: Case-insensitive partial string matching
- **Performance**: Client-side filtering for responsiveness

### 3. Search Highlighting
- **Location**: `TaskCard.highlightText()`
- **Strategy**: Split text by search term, wrap matches in `<mark>`
- **Regex**: Escape special characters, global case-insensitive
- **Styling**: Yellow background via CSS `.highlight` class
- **Applied to**: All searchable text fields in results

### 4. Edit Mode
- **State**: `editTaskData` in App.js (null = add mode, Task = edit mode)
- **Form Reuse**: Same TaskForm component handles both modes
- **Visual Indicator**: Orange border + banner when editing
- **Form Population**: `useEffect` watches `editTaskData` changes
- **Reset**: Clear `editTaskData` on save/cancel

### 5. Confirmation Dialogs  
- **Pattern**: Custom modal component vs browser confirm()
- **Positioning**: Fixed positioning to avoid layout issues
- **Accessibility**: Focus management and keyboard support
- **Reusability**: Generic component accepting title/message props
- **State Management**: Local component state for visibility

### 6. Priority System
- **Data**: Enum values (low/medium/high)
- **Visual**: Color-coded borders and badges
- **Colors**: 
  - High: Red (#ef4444)
  - Medium: Yellow (#f59e0b)  
  - Low: Green (#10b981)

### 7. Due Date System
- **Storage**: ISO date strings for consistency
- **Display**: Formatted via `formatDate()` utility
- **Status**: Calculated via `getDueDateStatus()` 
- **Visual**: Color coding for overdue/due-soon warnings
- **Calculation**: Based on current date comparison

---

## Development Notes

### Code Quality Practices
- **Functional Components**: Modern React with hooks
- **PropTypes**: Could be added for runtime validation
- **TypeScript**: Types documented but not enforced
- **Error Boundaries**: Could be added for production resilience
- **Testing**: Test files present but implementation needed

### Performance Considerations
- **Search**: Currently no debouncing - could add for large datasets
- **Memoization**: `useCallback` used in `useTasks` for stable references  
- **Rendering**: Keys properly used in map functions
- **Bundle Size**: Could implement code splitting for larger apps

### Accessibility
- **Labels**: Form labels properly associated  
- **Focus**: Interactive elements focusable
- **Contrast**: Colors meet accessibility standards
- **Screen Readers**: Semantic HTML structure
- **Keyboard**: Full keyboard navigation support

### Browser Support
- **Modern Features**: Uses ES6+, localStorage, React 18
- **Polyfills**: None currently included
- **Testing**: Primarily tested in modern browsers
- **Fallbacks**: localStorage has error handling fallbacks

---

*This documentation covers the complete architecture, state management, data flow, and implementation details of the Task Management application as of September 2025.*