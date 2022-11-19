import express from "express";

const router = express.Router();

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

type Exception = {
  error: {
    code: string;
    message: string;
  };
};

let tasks: Task[] = [];

router.get("/", (_req, res) => res.status(200).json(tasks));

router.post("/", (req, res) => {
  const id = tasks.length + 1;
  const { name, completed } = req.body;
  if (!name) {
    const exception: Exception = {
      error: {
        code: "task_bad_request",
        message: "solicitud mal formada",
      },
    };
    return res.status(400).json(exception);
  }

  const task = {
    id,
    name,
    completed: completed || false,
  };

  tasks = [...tasks, task];
  return res.status(201).json(task);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    const exception: Exception = {
      error: {
        code: "task_not_found",
        message: "La tarea no existe",
      },
    };
    return res.status(404).json(exception);
  }
  return res.status(200).json(task);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    const exception: Exception = {
      error: {
        code: "task_not_found",
        message: "La tarea no existe",
      },
    };
    return res.status(404).json(exception);
  }

  const { name, completed } = req.body;

  const taskUpdated = { id, name, completed };

  tasks = tasks.map((task) => {
    if (task.id === id) return taskUpdated;
    return task;
  });

  return res.status(200).json(taskUpdated);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    const exception: Exception = {
      error: {
        code: "task_not_found",
        message: "La tarea no existe",
      },
    };
    return res.status(404).json(exception);
  }
});

export default router;