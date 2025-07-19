import React, { useState, useRef, useEffect } from 'react';
import {
  IoLogOutOutline,
  IoNotificationsOutline,
  IoChevronDownSharp,
} from 'react-icons/io5';
import { TiThMenu, TiArrowBack } from 'react-icons/ti';
import DashboardSidebar from './DashboardSidebar';

const DashboardHead = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedImage = sessionStorage.getItem('profileImage');
    if (storedUsername) setUsername(storedUsername);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('username', username);

      console.log('Uploading profile image:', file);
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/uploadProfileImage`,
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );

    //   if (response.data?.imageUrl) {
    //     setProfileImage(response.data.imageUrl);
    //     sessionStorage.setItem('profileImage', response.data.imageUrl);
    //   }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`bg-white lg:hidden h-screen fixed z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <DashboardSidebar />
        <TiArrowBack
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-6 right-6 text-4xl text-accent hover:text-gray-800"
        />
      </div>

      {/* Header */}
      <div className="w-full h-14 bg-transparent px-4 flex items-center justify-between relative">
        <div className="lg:hidden">
          <TiThMenu
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl cursor-pointer"
          />
        </div>

        <div className="flex-1 mx-4"></div>

        <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
          <button>
            <IoNotificationsOutline className="text-gray-800 text-xl sm:text-2xl hover:text-accent" />
          </button>

          <button>
            <IoLogOutOutline
              onClick={() => {
                sessionStorage.clear();
                window.location.href = '/login';
                alert('You have been logged out successfully.');
              }}
              className="text-gray-800 text-xl hidden lg:block hover:text-accent"
            />
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer rounded-full pr-2 hover:bg-accent group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={profileImage || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-sm hidden lg:block font-medium text-gray-800 group-hover:text-white">
              {username}
            </span>
            <IoChevronDownSharp
              className={`text-gray-800 group-hover:text-white transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {dropdownOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white rounded-lg shadow-lg z-40 border border-accent/30 shadow-accent/40">
              <ul className="text-base text-gray-900">
                <li>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowEditModal(true);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-accent hover:text-white"
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = '/reset_password';
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-accent hover:text-white"
                  >
                    Forgot Password
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-primary bg-opacity-20 flex items-center justify-center z-40 ">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-80 sm:w-96 border border-accent/80 shadow-black/40">
            <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>

            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={profileImage || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border"
                id="profile-preview"
              />
              <button
                onClick={() => document.getElementById('profile-upload').click()}
                className="absolute bottom-1 right-1 bg-accent text-white p-2 rounded-full shadow hover:bg-accent/80"
              >
                ✎
              </button>
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleProfileImageUpload(file);
                  }
                }}
              />
            </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHead;
