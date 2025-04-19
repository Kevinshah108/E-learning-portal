import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const studentId = 'studentId'; 

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        const courseRes = await axiosInstance.get(`/courses/${courseId}`);
        setCourse(courseRes.data);

        const progressRes = await axiosInstance.get(`/progress/${studentId}/${courseId}`);
        setCompletedModules(progressRes.data.progress || []);
      } catch (error) {
        console.error('Error loading course or progress', error);
      }
    };

    fetchCourseAndProgress();
  }, [courseId]);

  const toggleModuleCompletion = async (moduleId) => {
    try {
      const res = await axiosInstance.post('/progress', { studentId, courseId, moduleId });
      setCompletedModules(res.data.progress);
    } catch (error) {
      console.error('Error updating progress', error);
    }
  };

  if (!course) {
    return <div className="p-4">Loading...</div>;
  }

  const progressPercent = course.modules.length > 0
    ? Math.round((completedModules.length / course.modules.length) * 100)
    : 0;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <img src={course.thumbnail} alt={course.title} className="w-full h-60 object-cover rounded-lg mb-6" />
      <p className="text-gray-600 mb-4">{course.description}</p>

      <div className="mb-6">
        <div className="h-4 w-full bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-4 bg-green-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-600 mt-1">{progressPercent}% Completed</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Modules</h2>
      <div className="space-y-4">
        {course.modules.map((module) => (
          <div
            key={module.id}
            className={`border p-4 rounded-lg flex items-center justify-between ${
              completedModules.includes(module.id) ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <span>{module.title}</span>
            <button
              onClick={() => toggleModuleCompletion(module.id)}
              className={`px-4 py-2 rounded ${
                completedModules.includes(module.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {completedModules.includes(module.id) ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;
