import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/Provider';

const PostTask = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'To-Do',
  });
  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axiosPublic.post('/tasks', {
        title: task.title, // Fixed issue (Backend expects title)
        description: task.description,
        category: task.category,
        userEmail: user.email,
      });

      console.log('Task added:', response.data);
      setTask({ title: '', description: '', category: 'To-Do' }); // Reset form

      // Navigate to the home page after task is added
      navigate('/');  // Assumes the home page route is '/'
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  return (
    <div className='p-10'>
      <div className="p-4 bg-white text-black shadow-md rounded-md max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task Title"
            maxLength="50"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Task Description (optional)"
            maxLength="200"
            className="w-full p-2 border rounded"
          ></textarea>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>

        <div className='py-3 flex flex-col justify-center'>
        <p className='py-1.5 text-sm text-center'>GO Back Home</p>
        
        <Link to={'/'}><button className='btn w-full'>Click</button></Link>

        </div>

      </div>
    </div>
  );
};

export default PostTask;
