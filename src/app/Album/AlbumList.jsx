import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { HiEye } from 'react-icons/hi'
import { fetchAlbums } from '../../store/AlbumSlice'
import { fetchUsers } from '../../store/UserSlice'

export default function AlbumList() {
  useDocumentTitle('Albums');
  const dispatch = useDispatch();
  const { albums } = useSelector(state => state.albums);
  const { users } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUserInitials = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return 'NA';
    const names = user.name.split(' ');
    return names.map(n => n[0]).join('');
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  return (
    <Layout>
      <div className="p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left border-b bg-gray-50">ID</th>
              <th className="py-3 px-4 text-left border-b bg-gray-50">Title</th>
              <th className="py-3 px-4 text-left border-b bg-gray-50">User</th>
              <th className="py-3 px-4 text-left border-b bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map(album => (
              <tr key={album.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 border-b">{album.id}</td>
                <td className="py-3 px-4 border-b font-medium">{album.title}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm transform hover:scale-110 transition-transform duration-200 shadow-sm">
                      {getUserInitials(album.userId)}
                    </div>
                    <span>{getUserName(album.userId)}</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b">
                  <button className="px-4 py-1.5 text-gray-600 font-medium border border-gray-300 rounded-md hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm">
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
