import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { useDocumentTitle } from "../../App";
import { fetchUsers, getAvatarUrl } from "../../store/UserSlice";
import { fetchAlbums } from "../../store/AlbumSlice";
import { HiMail, HiEye, HiArrowLeft } from "react-icons/hi";
import { LiaAddressCard } from "react-icons/lia";
import LoadingFallback from "../../components/LoadingFallback";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, todos, loading } = useSelector((state) => state.users);
  const { albums } = useSelector((state) => state.albums);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const userId = parseInt(id);

  useDocumentTitle(`#${id} Show User`);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if we already have the specific user and related albums
        const hasUser = users.some(u => u.id === userId);
        const hasAlbums = albums.some(a => a.userId === userId);
        
        const promises = [];
        if (!hasUser) promises.push(dispatch(fetchUsers()));
        if (!hasAlbums) promises.push(dispatch(fetchAlbums()));
        
        if (promises.length > 0) {
          await Promise.all(promises);
        }
        
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    
    loadData();
  }, [dispatch, userId, users, albums]);

  const user = users.find((u) => u.id === userId);

  if (loading || !isDataLoaded) {
    return (
      <Layout>
        <LoadingFallback message="Loading user details..." />
      </Layout>
    );
  }

  // If data is loaded but user is not found, show error
  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="text-2xl font-bold text-red-500">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/users')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Users
          </button>
        </div>
      </Layout>
    );
  }

  const userAlbums = albums.filter((album) => album.userId === userId);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      {/* Section Header */}
      <div className="flex flex-col gap-1 mb-5 mx-6">
        <div className="flex items-center gap-2">
          <LiaAddressCard className="w-4 h-4" />
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            Users
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-gray-600">Show</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Show User</h1>
        </div>
      </div>

      <div className="p-6 mx-6 mb-6 max-w-[1400px] bg-white rounded-lg shadow-sm">
        {/* Section Content */}
        <div className=" mx-auto space-y-6 border border-gray-100 rounded-lg shadow-sm">
          {/* User Information Card */}
          <div className=" rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-star gap-4">
                <img
                  src={getAvatarUrl(user.name, { size: 32 })}
                  alt={`${user.name}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h1 className="font-bold transition-colors cursor-pointer">
                    {user.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Albums Section */}
          <div className="rounded-lg shadow-sm">
            <div className="pb-6 px-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Albums</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="py-4 px-4 text-left font-semibold text-black w-[10%]">
                      ID
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-black w-[75%]">
                      Title
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-black w-[15%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userAlbums.map((album) => (
                    <tr
                      key={album.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4 border-b">{album.id}</td>
                      <td className="py-4 px-4 border-b font-medium">
                        {album.title}
                      </td>
                      <td className="px-4 py-4 border-b">
                        <button
                          onClick={() => navigate(`/albums/${album.id}`)}
                          className="px-2 py-0.5 border border-gray-300 rounded-md hover:text-blue-400 hover:border-blue-400 transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm"
                        >
                          <HiEye className="w-4 h-4" />
                          Show
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
