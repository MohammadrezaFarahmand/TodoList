type TaskStatus = "todo" | "doing" | "done"

type TaskLabel = "Green" | "Blue" | "Red" | "Yellow"

type Task = {
  subject: string
  date: string
  label: TaskLabel
  status: TaskStatus
  startTime?: string
  completionTime?: string
}

type ToDoList = Task[]

const taskTitleInput = document.getElementById("taskTitle") as HTMLInputElement
const taskLabelSelect = document.getElementById(
  "taskLabel"
) as HTMLSelectElement
const taskStatusLabel = document.getElementById(
  "taskStatusLabel"
) as HTMLSelectElement
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement
const taskList = document.getElementById("taskList") as HTMLUListElement

const tasks: ToDoList = []

addTaskButton.addEventListener("click", () => {
  const title = taskTitleInput.value
  const label = taskLabelSelect.value as TaskLabel
  if (title && label) {
    const newTask: Task = {
      subject: title,
      date: new Date().toLocaleDateString(),
      label: label,
      status: "todo",
    }
    tasks.push(newTask)
    taskTitleInput.value = " "
    displayTasks()
  }
})

function changeStatus(index: number) {
  const newStatus = taskStatusLabel.value as TaskStatus
  if (newStatus) {
    const task = tasks[index]
    task.status = newStatus
    if (newStatus === "doing") {
      task.startTime = new Date().toLocaleTimeString()
    } else if (newStatus === "done") {
      task.completionTime = new Date().toLocaleTimeString()
    }
    displayTasks()
  }
}

function displayTasks() {
  taskList.innerHTML = ""
  tasks.map((task, index) => {
    const li = document.createElement("li")
    li.innerHTML = `
      ${task.subject} - ${task.date} - ${task.label} - ${task.status}
      <button class="change-status-button" data-index="${index}">Change Status</button>
      <button onclick="removeTask(${index})">Remove</button>
    `
    taskList.appendChild(li)
  })
}

function removeTask(index: number) {
  tasks.splice(index, 1)
  displayTasks()
}

displayTasks()
