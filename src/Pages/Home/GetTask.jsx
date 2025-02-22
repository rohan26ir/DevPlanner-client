import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/Provider';

const GetTask = () => {
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

  // Categorizing tasks
  const toDoTasks = tasks.filter(task => task.category === 'To-Do');
  const inProgressTasks = tasks.filter(task => task.category === 'In Progress');
  const doneTasks = tasks.filter(task => task.category === 'Done');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-Do Column */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">📝 To-Do</h3>
          {toDoTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks</p>
          ) : (
            toDoTasks.map(task => (
              <div key={task._id} className="bg-white p-3 rounded-md shadow-sm mb-3">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))
          )}
        </div>

        {/* In Progress Column */}
        <div className="bg-yellow-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">🚀 In Progress</h3>
          {inProgressTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks</p>
          ) : (
            inProgressTasks.map(task => (
              <div key={task._id} className="bg-white p-3 rounded-md shadow-sm mb-3">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))
          )}
        </div>

        {/* Done Column */}
        <div className="bg-green-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">✅ Done</h3>
          {doneTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks</p>
          ) : (
            doneTasks.map(task => (
              <div key={task._id} className="bg-white p-3 rounded-md shadow-sm mb-3">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GetTask;
