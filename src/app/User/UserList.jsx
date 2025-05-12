import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { HiEye } from 'react-icons/hi'
import { fetchUsers, getAvatarUrl } from '../../store/UserSlice'
import LoadingFallback from '../../components/LoadingFallback'

export default function UserList() {
  useDocumentTitle('Users');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  if (loading) return <Layout><LoadingFallback message="Loading users..." /></Layout>;
  if (error) return <Layout><LoadingFallback message={`Error: ${error}`} size="small" /></Layout>;

  return (
    <Layout>
      <div className="p-5 max-w-[1280px] mx-auto bg-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        </div>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">ID</th>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">Avatar</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Name</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Email</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Phone</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Website</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 border-b font-medium">{user.id}</td>
                <td className="py-3 px-4 border-b">
                  <img 
                    src={getAvatarUrl(user.name, { size: 32 })}
                    alt={`${user.name}'s avatar`}
                    className="w-8 h-8 rounded-full transform hover:scale-110 transition-transform duration-200 shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 border-b font-medium">
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b">
                  <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-700 transition-colors duration-150">
                    {user.email}
                  </a>
                </td>
                <td className="py-3 px-4 border-b hover:text-gray-900 transition-colors duration-150">
                  {user.phone}
                </td>
                <td className="py-3 px-4 border-b">
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-700 transition-colors duration-150">
                    {user.website}
                  </a>
                </td>
                <td className="py-3 px-4 border-b">
                  <button 
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="px-4 py-1.5 text-gray-600 font-medium border border-gray-300 rounded-md 
                             hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 
                             transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm">
                    <HiEye className="w-4 h-4" />
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
