import React from 'react';
import PostTask from './PostTask';
import GetTask from './GetTask';
import TaskBoard from './TaskBoard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-gray-100  text-black'>
      <div className='w-11/12 mx-auto'>

      <div className='py-5 flex justify-center'>
        <Link to={'/addtask'}><button className='btn'>Add Task</button></Link>
      </div>


      <div className='bg-white'>
        <TaskBoard></TaskBoard>
      </div>

      </div>
    </div>
  );
};

export default Home;