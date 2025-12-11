#!/usr/bin/env python3
"""
Simple command-line Todo List Application
Store tasks in a JSON file with persistence between sessions
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Optional


# ANSI color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


TASKS_FILE = 'tasks.json'


class TodoList:
    """Main Todo List class to manage tasks"""

    def __init__(self, filename: str = TASKS_FILE):
        self.filename = filename
        self.tasks: List[Dict] = []
        self.load_tasks()

    def load_tasks(self) -> None:
        """Load tasks from JSON file"""
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r') as f:
                    self.tasks = json.load(f)
                print(f"{Colors.OKGREEN}✓ Loaded {len(self.tasks)} task(s) from {self.filename}{Colors.ENDC}")
            except json.JSONDecodeError:
                print(f"{Colors.WARNING}⚠ Warning: Could not parse {self.filename}. Starting with empty task list.{Colors.ENDC}")
                self.tasks = []
            except Exception as e:
                print(f"{Colors.FAIL}✗ Error loading tasks: {e}{Colors.ENDC}")
                self.tasks = []
        else:
            print(f"{Colors.OKCYAN}Starting with a new task list.{Colors.ENDC}")
            self.tasks = []

    def save_tasks(self) -> None:
        """Save tasks to JSON file"""
        try:
            with open(self.filename, 'w') as f:
                json.dump(self.tasks, f, indent=2)
            print(f"{Colors.OKGREEN}✓ Tasks saved successfully{Colors.ENDC}")
        except Exception as e:
            print(f"{Colors.FAIL}✗ Error saving tasks: {e}{Colors.ENDC}")

    def get_next_id(self) -> int:
        """Get the next available task ID"""
        if not self.tasks:
            return 1
        return max(task['id'] for task in self.tasks) + 1

    def add_task(self, description: str) -> None:
        """Add a new task"""
        if not description.strip():
            print(f"{Colors.FAIL}✗ Error: Task description cannot be empty{Colors.ENDC}")
            return

        task = {
            'id': self.get_next_id(),
            'description': description.strip(),
            'completed': False,
            'created_at': datetime.now().isoformat()
        }
        self.tasks.append(task)
        self.save_tasks()
        print(f"{Colors.OKGREEN}✓ Task added with ID {task['id']}: {description}{Colors.ENDC}")

    def list_tasks(self) -> None:
        """List all tasks"""
        if not self.tasks:
            print(f"{Colors.WARNING}No tasks found. Add some tasks to get started!{Colors.ENDC}")
            return

        print(f"\n{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.HEADER}{'TODO LIST':^70}{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}\n")

        pending_tasks = [t for t in self.tasks if not t['completed']]
        completed_tasks = [t for t in self.tasks if t['completed']]

        if pending_tasks:
            print(f"{Colors.BOLD}{Colors.WARNING}PENDING TASKS:{Colors.ENDC}")
            for task in pending_tasks:
                created = datetime.fromisoformat(task['created_at']).strftime('%Y-%m-%d %H:%M')
                print(f"  {Colors.FAIL}[ ]{Colors.ENDC} ID: {Colors.OKBLUE}{task['id']}{Colors.ENDC} | {task['description']}")
                print(f"      {Colors.OKCYAN}Created: {created}{Colors.ENDC}")

        if completed_tasks:
            print(f"\n{Colors.BOLD}{Colors.OKGREEN}COMPLETED TASKS:{Colors.ENDC}")
            for task in completed_tasks:
                created = datetime.fromisoformat(task['created_at']).strftime('%Y-%m-%d %H:%M')
                print(f"  {Colors.OKGREEN}[✓]{Colors.ENDC} ID: {Colors.OKBLUE}{task['id']}{Colors.ENDC} | {task['description']}")
                print(f"      {Colors.OKCYAN}Created: {created}{Colors.ENDC}")

        print(f"\n{Colors.BOLD}Total: {len(self.tasks)} task(s) | Pending: {len(pending_tasks)} | Completed: {len(completed_tasks)}{Colors.ENDC}\n")

    def find_task_by_id(self, task_id: int) -> Optional[Dict]:
        """Find a task by its ID"""
        for task in self.tasks:
            if task['id'] == task_id:
                return task
        return None

    def complete_task(self, task_id: int) -> None:
        """Mark a task as completed"""
        task = self.find_task_by_id(task_id)
        if task is None:
            print(f"{Colors.FAIL}✗ Error: Task with ID {task_id} not found{Colors.ENDC}")
            return

        if task['completed']:
            print(f"{Colors.WARNING}⚠ Task {task_id} is already completed{Colors.ENDC}")
            return

        task['completed'] = True
        task['completed_at'] = datetime.now().isoformat()
        self.save_tasks()
        print(f"{Colors.OKGREEN}✓ Task {task_id} marked as completed: {task['description']}{Colors.ENDC}")

    def delete_task(self, task_id: int) -> None:
        """Delete a task"""
        task = self.find_task_by_id(task_id)
        if task is None:
            print(f"{Colors.FAIL}✗ Error: Task with ID {task_id} not found{Colors.ENDC}")
            return

        description = task['description']
        self.tasks = [t for t in self.tasks if t['id'] != task_id]
        self.save_tasks()
        print(f"{Colors.OKGREEN}✓ Task {task_id} deleted: {description}{Colors.ENDC}")


def print_menu() -> None:
    """Display the main menu"""
    print(f"\n{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.OKCYAN}Available Commands:{Colors.ENDC}")
    print(f"  {Colors.BOLD}add{Colors.ENDC}           - Add a new task")
    print(f"  {Colors.BOLD}list{Colors.ENDC}          - List all tasks")
    print(f"  {Colors.BOLD}complete <id>{Colors.ENDC} - Mark a task as completed")
    print(f"  {Colors.BOLD}delete <id>{Colors.ENDC}   - Delete a task")
    print(f"  {Colors.BOLD}quit{Colors.ENDC}          - Exit the application")
    print(f"{Colors.BOLD}{Colors.HEADER}{'='*70}{Colors.ENDC}\n")


def main():
    """Main application loop"""
    print(f"\n{Colors.BOLD}{Colors.HEADER}{'*'*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}{'Welcome to Todo List Manager!':^70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}{'*'*70}{Colors.ENDC}\n")

    todo_list = TodoList()
    print_menu()

    while True:
        try:
            command = input(f"{Colors.BOLD}{Colors.OKBLUE}Enter command: {Colors.ENDC}").strip().lower()

            if not command:
                continue

            if command == 'quit':
                print(f"\n{Colors.OKGREEN}Thank you for using Todo List Manager. Goodbye!{Colors.ENDC}\n")
                break

            elif command == 'add':
                description = input(f"{Colors.OKCYAN}Enter task description: {Colors.ENDC}").strip()
                todo_list.add_task(description)

            elif command == 'list':
                todo_list.list_tasks()

            elif command.startswith('complete '):
                try:
                    parts = command.split()
                    if len(parts) != 2:
                        print(f"{Colors.FAIL}✗ Error: Usage: complete <id>{Colors.ENDC}")
                        continue
                    task_id = int(parts[1])
                    todo_list.complete_task(task_id)
                except ValueError:
                    print(f"{Colors.FAIL}✗ Error: Invalid task ID. Please provide a number.{Colors.ENDC}")

            elif command.startswith('delete '):
                try:
                    parts = command.split()
                    if len(parts) != 2:
                        print(f"{Colors.FAIL}✗ Error: Usage: delete <id>{Colors.ENDC}")
                        continue
                    task_id = int(parts[1])
                    todo_list.delete_task(task_id)
                except ValueError:
                    print(f"{Colors.FAIL}✗ Error: Invalid task ID. Please provide a number.{Colors.ENDC}")

            elif command == 'help' or command == 'menu':
                print_menu()

            else:
                print(f"{Colors.FAIL}✗ Unknown command: '{command}'{Colors.ENDC}")
                print(f"{Colors.WARNING}Type 'help' to see available commands{Colors.ENDC}")

        except KeyboardInterrupt:
            print(f"\n\n{Colors.OKGREEN}Interrupted. Goodbye!{Colors.ENDC}\n")
            break
        except Exception as e:
            print(f"{Colors.FAIL}✗ An unexpected error occurred: {e}{Colors.ENDC}")


if __name__ == '__main__':
    main()
