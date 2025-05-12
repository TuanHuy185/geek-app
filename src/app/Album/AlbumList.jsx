import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { HiEye } from 'react-icons/hi'
import { fetchAlbums } from '../../store/AlbumSlice'
import { fetchUsers, getAvatarUrl } from '../../store/UserSlice'
import LoadingFallback from '../../components/LoadingFallback'

export default function AlbumList() {
  useDocumentTitle('Albums');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = 10;

  const { albums, loading } = useSelector(state => state.albums);
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

  const paginatedAlbums = albums.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(albums.length / perPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <Layout>
      <div className="min-h-screen">
        <LoadingFallback message="Loading albums..." />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="p-5 max-w-[1400px] mx-auto bg-white">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">ID</th>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">Title</th>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">User</th>
              <th className="py-3 px-4 text-left border-b bg-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAlbums.map(album => (
              <tr key={album.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 border-b">{album.id}</td>
                <td className="py-3 px-4 border-b font-medium">{album.title}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center gap-3 cursor-pointer" 
                       onClick={() => navigate(`/users/${album.userId}`)}>
                    <img 
                      src={getAvatarUrl(getUserName(album.userId), { size: 32 })}
                      alt={`${getUserName(album.userId)}'s avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{getUserName(album.userId)}</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b">
                  <button 
                    onClick={() => navigate(`/albums/${album.id}`)}
                    className="px-4 py-1.5 text-gray-600 font-medium border border-gray-300 rounded-md hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm"
                  >
                    <HiEye className="w-4 h-4" />
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(num => num === 1 || num === totalPages || Math.abs(num - page) <= 2)
            .map((num, i, arr) => (
              <React.Fragment key={num}>
                {i > 0 && arr[i - 1] !== num - 1 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                <button
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1 rounded ${
                    page === num 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${
              page === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}
