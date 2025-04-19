import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Loading courses...</div>;
  }

  return (
    <div className="p-6">
        <div className='mt-14 mb-5 ml-2 text-lg'>
          <Link to="/" className='hover:underline'>Home</Link>{" / "}
          <Link to="/coursepage" className='hover:underline'>Courses</Link>
        </div>
      <h1 className="text-2xl font-bold mb-4 ml-2">Explore More Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <div key={course.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-2" />
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <Link to={`/courses/${course.id}`} className="text-blue-500 mt-2 inline-block font-medium hover:underline">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePage;
