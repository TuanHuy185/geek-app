import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { HiEye } from 'react-icons/hi'
import { fetchAlbums } from '../../store/AlbumSlice'
import { fetchUsers, getAvatarUrl } from '../../store/UserSlice'
import LoadingFallback from '../../components/LoadingFallback'

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  .animate-fadeOut {
    animation: fadeOut 0.2s ease-out;
  }
`;
document.head.appendChild(style);

export default function AlbumList() {
  useDocumentTitle('Albums');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('current') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  const { albums, loading } = useSelector(state => state.albums);
  const { users } = useSelector(state => state.users);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState(pageSize.toString());
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          toggleDropdown();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value > 0) {
        handlePageSizeChange(value);
        setIsOpen(false);
      }
    }
  };

  const toggleDropdown = () => {
    setIsClosing(false);
    setIsOpen(prev => !prev);
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
            
            if (startPage > 1) {
              pageNumbers.push(1);
              if (startPage > 2) {
                pageNumbers.push({
                  type: 'prev-ellipsis',
                  targetPage: Math.max(1, startPage - groupSize)
                });
              }
            }
            
            for (let i = 0; i < groupSize && (startPage + i) <= totalPages; i++) {
              pageNumbers.push(startPage + i);
            }
            
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

          <div className="relative ml-2" ref={dropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOpen) toggleDropdown();
                }}
                className="w-24 outline-none border border-gray-300 rounded-lg px-2 py-1.5 text-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                placeholder="Page size"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">/ page</span>
            </div>
            
            {(isOpen || isClosing) && (
              <div 
                className={`absolute bottom-[120%] left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-24 z-50 ${
                  isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                }`}
              >
                {[10, 20, 50, 100].map(size => (
                  <div
                    key={size}
                    className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors duration-150 hover:text-blue-600"
                    onClick={() => {
                      handlePageSizeChange(size);
                      setInputValue(size.toString());
                      toggleDropdown();
                    }}
                  >
                    {size} / page
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  )
}
