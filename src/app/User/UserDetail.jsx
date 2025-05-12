import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { fetchUsers, getAvatarUrl } from '../../store/UserSlice'
import { HiMail, HiEye } from 'react-icons/hi'
import LoadingFallback from '../../components/LoadingFallback'

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, todos, loading } = useSelector(state => state.users);
  const { albums } = useSelector(state => state.albums);
  
  useDocumentTitle('User Detail');

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  if (loading) return <Layout><LoadingFallback message="Loading user details..." /></Layout>;

  const user = users.find(u => u.id === parseInt(id));
  if (!user) return <Layout><LoadingFallback message="User not found" size="small" /></Layout>;

  const userAlbums = albums.filter(album => album.userId === parseInt(id));

  return (
    <Layout>
      <div className="p-5 max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <img 
                  src={getAvatarUrl(user.name, { size: 80 })}
                  alt={`${user.name}'s avatar`}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <HiMail className="w-5 h-5" />
                    <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-700">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <a href={`tel:${user.phone}`} 
                       className="text-blue-500 hover:text-blue-700 cursor-pointer">
                      {user.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Albums Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Albums</h2>
              <div className="space-y-2">
                {userAlbums.map(album => (
                  <div key={album.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <span className="text-gray-500 mr-2">#{album.id}</span>
                      <span className="font-medium">{album.title}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/albums/${album.id}`)}
                      className="px-3 py-1 text-sm text-gray-600 font-medium border border-gray-300 rounded-md 
                               hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 
                               transition-all duration-200 inline-flex items-center gap-1"
                    >
                      <HiEye className="w-4 h-4" />
                      Show
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
