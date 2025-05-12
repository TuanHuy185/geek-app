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
      <div className=" max-w-[1400px] mx-6 bg-white">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-4 text-left font-semibold  text-black w-[6%]">ID</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[58%]">Title</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[22%]">User</th>
              <th className="py-4 px-4 text-left font-semibold  text-black w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAlbums.map(album => (
              <tr key={album.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4 border-b">{album.id}</td>
                <td className="py-4 px-4 border-b">{album.title}</td>
                <td className="py-4 px-4 border-b">
                  <div className="flex items-center gap-4 cursor-pointer" 
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
      {/* Pagination Section */}
      <div className="px-6 pt-4 pb-10 flex items-center justify-end gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-2 py-1 text-xl font-bold ${
              page === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-500 hover:bg-gray-200 rounded-lg'
            }`}
          >
            &lsaquo;
          </button>

          {(() => {
            const pageNumbers = [];
            const groupSize = 5;
            const currentGroup = Math.floor((page - 1) / groupSize);
            const startPage = currentGroup * groupSize + 1;
            
            // Always add page 1
            if (startPage > 1) {
              pageNumbers.push(1);
              // Add left ellipsis if not in first group
              if (startPage > 2) {
                pageNumbers.push({
                  type: 'prev-ellipsis',
                  targetPage: Math.max(1, startPage - groupSize)
                });
              }
            }
            
            // Add current group pages
            for (let i = 0; i < groupSize && (startPage + i) <= totalPages; i++) {
              pageNumbers.push(startPage + i);
            }
            
            // Add last page if not included
            if (startPage + groupSize < totalPages) {
              if (startPage + groupSize < totalPages - 1) {
                pageNumbers.push({
                  type: 'next-ellipsis',
                  targetPage: startPage + groupSize
                });
              }
              pageNumbers.push(totalPages);
            }

            return pageNumbers.map((item, index) => {
              if (typeof item === 'number') {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(item)}
                    className={`min-w-[32px] px-3 py-1 text-sm rounded-lg ${
                      page === item 
                        ? 'bg-white text-blue-600 font-medium border border-blue-600' 
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                );
              } else {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(item.targetPage)}
                    className="px-2 py-1 text-gray-400 hover:text-blue-600 group min-w-[32px] flex items-center justify-center text-lg"
                  >
                    <span className="group-hover:hidden text-2xl leading-none relative top-[-8px]">...</span>
                    <span className="hidden group-hover:inline text-xl font-medium">
                      {item.type === 'prev-ellipsis' ? '«' : '»'}
                    </span>
                  </button>
                );
              }
            });
          })()}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-2 py-1 text-xl font-bold ${
              page === totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-500 hover:bg-gray-200 rounded-lg'
            }`}
          >
            &rsaquo;
          </button>

          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            className="ml-2 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-gray-600"
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
