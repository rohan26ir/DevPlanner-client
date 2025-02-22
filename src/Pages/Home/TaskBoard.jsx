import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/Provider';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskBoard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axiosPublic.get(`/tasks?userEmail=${user.email}`);
      setTasks(response.data);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
    }
  };

  const moveTask = async (id, newCategory) => {
    try {
      await axiosPublic.put(`/tasks/${id}`, { category: newCategory });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, category: newCategory } : task))
      );
    } catch (error) {
      console.error('❌ Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosPublic.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('❌ Error deleting task:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['To-Do', 'In Progress', 'Done'].map((category) => (
          <TaskColumn
            key={category}
            category={category}
            tasks={tasks.filter((task) => task.category === category)}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const TaskColumn = ({ category, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, category),
  });

  return (
    <div ref={drop} className="p-4 rounded-md shadow-md min-h-[300px] bg-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-center">{category}</h3>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
};

const TaskCard = ({ task, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-3 rounded-md shadow-sm mb-3 ${isDragging ? 'opacity-50' : ''}`}
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <button onClick={() => deleteTask(task._id)} className="text-red-500 text-sm mt-2">Delete</button>
    </div>
  );
};

export default TaskBoard;
