import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const { authStudent, isCheckingAuth, updateProfile } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (!isCheckingAuth && !authStudent) {
      navigate("/welcome");
    }
    if (authStudent) {
      setFormData({
        fullName: authStudent.fullName,
        email: authStudent.email,
      });
    }
  }, [authStudent, isCheckingAuth, navigate]);

  const handleUpdateProfile = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  if (isCheckingAuth) {
    return <div className="p-4">Loading...</div>;
  }

  if (!authStudent) {
    return null; // already redirecting
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border p-2 rounded w-full mt-1"
            />
          ) : (
            <p className="mt-1">{authStudent.fullName}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 rounded w-full mt-1"
            />
          ) : (
            <p className="mt-1">{authStudent.email}</p>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
