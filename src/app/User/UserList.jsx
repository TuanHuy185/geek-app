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
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  if (loading || !users.length) return <Layout><LoadingFallback message="Loading users..." /></Layout>;
  if (error) return <Layout><LoadingFallback message={`Error: ${error}`} size="small" /></Layout>;

  return (
    <Layout>
      <div className="max-w-[1400px] mx-6 mb-5">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-800">Users</h1>
        </div>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">ID</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Avatar</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Name</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Email</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Phone</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Website</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-600 text-[15px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4 border-b font-medium">{user.id}</td>
                <td className="py-4 px-4 border-b">
                  <img 
                    src={getAvatarUrl(user.name, { size: 32 })}
                    alt={`${user.name}'s avatar`}
                    className="w-8 h-8 rounded-full transform hover:scale-110 transition-transform duration-200 shadow-sm"
                  />
                </td>
                <td className="py-4 px-4 border-b text-gray-900">
                  {user.name}
                </td>
                <td className="py-4 px-4 border-b">
                  <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-400 transition-colors">
                    {user.email}
                  </a>
                </td>
                <td className="py-4 px-4 border-b">
                  <a href={`tel:${user.phone}`} className="text-blue-500 hover:text-blue-400 transition-colors">
                    {user.phone}
                  </a>
                </td>
                <td className="py-4 px-4 border-b">
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-400 transition-colors">
                    {user.website}
                  </a>
                </td>
                <td className="py-4 px-4 border-b">
                  <button 
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="px-2 py-0.5 border border-gray-300 rounded-md hover:text-blue-400 hover:border-blue-400 transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm">
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
