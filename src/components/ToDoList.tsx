import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../services/api";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    // Charger les tâches au montage du composant
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches :", error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title || !newTask.description) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        try {
            const addedTask = await createTask(newTask);
            setTasks([...tasks, addedTask]);
            setNewTask({ title: "", description: "" }); // Réinitialiser le formulaire
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-base-100 rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">To-Do List</h1>

            {/* Formulaire pour ajouter une tâche */}
            <div className="space-y-2 flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Titre"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                />
                <button
                    className="btn btn-primary text-white"
                    onClick={handleAddTask}
                >
                    Ajouter une tâche
                </button>
            </div>

            {/* Liste des tâches */}
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="p-4 bg-base-300 border border-primary rounded-md flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{task.title}</h2>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <button
                            className="btn btn-error"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
