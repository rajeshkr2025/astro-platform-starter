# Command-Line Todo List Application

A simple, colorful, and user-friendly command-line todo list manager built with Python. Keep track of your tasks with ease!

## Features

- ✅ **Add new tasks** with descriptions
- 📋 **List all tasks** with their status (pending/completed) and unique IDs
- ✓ **Mark tasks as complete** when you're done
- 🗑️ **Delete tasks** you no longer need
- 💾 **Persistent storage** - tasks are saved to a JSON file and persist between sessions
- 🎨 **Colorful output** - easy-to-read color-coded interface
- 🛡️ **Error handling** - handles invalid inputs gracefully
- 📅 **Timestamps** - tracks when each task was created

## Requirements

- Python 3.6 or higher
- No external dependencies required (uses only Python standard library)

## Installation

1. Download the `todo.py` file to your desired directory
2. Make the file executable (optional, for Unix-like systems):
   ```bash
   chmod +x todo.py
   ```

## Usage

### Starting the Application

Run the application using Python:

```bash
python3 todo.py
```

Or, if you made it executable:

```bash
./todo.py
```

### Available Commands

Once the application is running, you can use the following commands:

| Command | Description | Example |
|---------|-------------|---------|
| `add` | Add a new task | `add` then enter task description |
| `list` | Display all tasks with their status | `list` |
| `complete <id>` | Mark a task as completed | `complete 1` |
| `delete <id>` | Delete a task | `delete 2` |
| `help` or `menu` | Show the command menu | `help` |
| `quit` | Exit the application | `quit` |

### Step-by-Step Examples

#### Adding a Task

```
Enter command: add
Enter task description: Buy groceries
✓ Task added with ID 1: Buy groceries
```

#### Listing Tasks

```
Enter command: list

======================================================================
                             TODO LIST
======================================================================

PENDING TASKS:
  [ ] ID: 1 | Buy groceries
      Created: 2025-12-11 10:30

Total: 1 task(s) | Pending: 1 | Completed: 0
```

#### Completing a Task

```
Enter command: complete 1
✓ Task 1 marked as completed: Buy groceries
```

#### Deleting a Task

```
Enter command: delete 1
✓ Task 1 deleted: Buy groceries
```

#### Exiting the Application

```
Enter command: quit
Thank you for using Todo List Manager. Goodbye!
```

## Data Storage

Tasks are automatically saved to a file named `tasks.json` in the same directory as the application. This file is created automatically when you add your first task.

### Task Structure

Each task is stored with the following information:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "completed": false,
  "created_at": "2025-12-11T10:30:00.123456"
}
```

When a task is marked as completed, a `completed_at` timestamp is also added.

## Color Coding

The application uses colors to make the interface more intuitive:

- 🟢 **Green** - Success messages and completed tasks
- 🔵 **Blue** - Task IDs and prompts
- 🟡 **Yellow** - Pending tasks and warnings
- 🔴 **Red** - Errors and unchecked task boxes
- 🔵 **Cyan** - Timestamps and informational messages
- 🟣 **Purple/Magenta** - Headers and section titles

## Error Handling

The application includes comprehensive error handling for:

- Empty task descriptions
- Invalid task IDs
- Non-existent tasks
- Corrupted JSON files
- Keyboard interrupts (Ctrl+C)
- Unexpected errors

## Tips

1. **Task IDs are unique** - Each task gets a unique ID that persists even if you delete other tasks
2. **Case insensitive** - Commands work in any case (e.g., 'ADD', 'add', 'Add' all work)
3. **Auto-save** - Tasks are automatically saved after each operation
4. **Keyboard shortcuts** - Use Ctrl+C to exit quickly at any time
5. **Help command** - Type 'help' or 'menu' anytime to see available commands

## Troubleshooting

### Problem: Colors not displaying correctly

If you're on Windows and colors aren't displaying properly, you may need to enable ANSI color support. Windows 10 and later support ANSI colors in the newer Windows Terminal application.

### Problem: Permission denied when running the script

Make sure you have Python installed and the file has execute permissions:

```bash
python3 --version  # Check Python is installed
chmod +x todo.py   # Add execute permissions (Unix-like systems)
```

### Problem: Tasks not persisting

Ensure the application has write permissions in the directory where it's located. The `tasks.json` file should be created automatically in the same directory as `todo.py`.

## License

This is a simple educational project. Feel free to use, modify, and distribute as needed.

## Contributing

This is a standalone application. Feel free to enhance it with additional features such as:

- Task priorities
- Due dates
- Task categories/tags
- Search functionality
- Task editing
- Export to different formats
- Multiple task lists

Enjoy organizing your tasks! 🚀
