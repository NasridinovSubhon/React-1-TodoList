import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../config/api';

const UserByID = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  async function GetByID() {
    try {
      const { data } = await axios.get(`${Api}/${id}`);
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetByID();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top;  // y position within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation angle
    const maxRotate = 15; // degrees

    // Calculate rotation relative to center (-maxRotate to maxRotate)
    const rotateY = ((x - centerX) / centerX) * maxRotate;
    const rotateX = -((y - centerY) / centerY) * maxRotate;

    // Slight scale down on hover (pressed effect)
    const scale = 0.95;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform 0.1s ease-out',
      // Add nice background with blur, gradient and reflection
      background:
        `linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,197,253,0.1))`,
      backdropFilter: 'blur(12px)',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease',
      background: 'transparent',
      backdropFilter: 'none',
      boxShadow: 'none',
    });
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group w-[350px] h-[400px] rounded-2xl cursor-pointer [perspective:1000px]"
        style={style}
      >
        <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl  bg-white dark:bg-gray-900">
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full rounded-2xl p-6 flex flex-col justify-center backface-hidden dark:text-white">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
              User Details
            </h2>
            <p className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>{' '}
              {data.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">ID:</span>{' '}
              {data.id}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Description:</span>{' '}
              {data.description}
            </p>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden overflow-hidden rounded-2xl">
            {data?.images?.[0] ? (
              <img
                src={`https://to-dos-api.softclub.tj/images/${data.images[0].imageName}`}
                alt="user"
                className="w-full h-full object-contain opacity-90 hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserByID;
