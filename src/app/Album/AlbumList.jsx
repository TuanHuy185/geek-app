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
  const page = parseInt(searchParams.get('current') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

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

  const paginatedAlbums = albums.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(albums.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ current: newPage.toString(), pageSize: pageSize.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageSizeChange = (size) => {
    setSearchParams({ current: '1', pageSize: size.toString() });
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
      <div className=" max-w-[1400px] mx-auto bg-white">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="py-4 px-4 text-left font-semibold  text-black w-[6%]">ID</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[55%]">Title</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[22%]">User</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[13%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAlbums.map(album => (
              <tr key={album.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4 border-b">{album.id}</td>
                <td className="py-4 px-4 border-b font-medium">{album.title}</td>
                <td className="py-4 px-4 border-b">
                  <div className="flex items-center gap-3 cursor-pointer" 
                       onClick={() => navigate(`/users/${album.userId}`)}>
                    <img 
                      src={getAvatarUrl(getUserName(album.userId), { size: 32 })}
                      alt={`${getUserName(album.userId)}'s avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-blue-500 hover:text-blue-400 transition-colors">
                      {getUserName(album.userId)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-1 border-b">
                  <button 
                    onClick={() => navigate(`/albums/${album.id}`)}
                    className="px-2 py-0.5 text-gray-600  border border-gray-300 rounded-md hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm"
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
      {/* Pagination Section */}
      <div className="bg-white mt-6 px-6 py-4 flex items-center justify-center gap-4 border-t border-gray-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 text-sm rounded-lg border ${
              page === 1 
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(num => num === 1 || num === totalPages || Math.abs(num - page) <= 1)
            .map((num, i, arr) => (
              <React.Fragment key={num}>
                {i > 0 && arr[i - 1] !== num - 1 && (
                  <span className="px-2 py-1 text-gray-400">...</span>
                )}
                <button
                  onClick={() => handlePageChange(num)}
                  className={`min-w-[32px] px-3 py-1 text-sm rounded-lg border ${
                    page === num 
                      ? 'bg-blue-50 text-blue-600 font-medium border-blue-200' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {num}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 text-sm rounded-lg border ${
              page === totalPages 
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
            }`}
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            className="ml-2 border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-600"
          >
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>
        </div>
      </div>
    </Layout>
  )
}
