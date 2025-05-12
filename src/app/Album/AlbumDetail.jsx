import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import LoadingFallback from '../../components/LoadingFallback'
import { useDocumentTitle } from '../../App'
import { fetchPhotos } from '../../store/AlbumSlice'
import { fetchUsers } from '../../store/UserSlice'

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos, albums, loading } = useSelector(state => state.albums);
  const { users } = useSelector(state => state.users);
  
  useDocumentTitle('Album Detail');

  useEffect(() => {
    dispatch(fetchPhotos());
    dispatch(fetchUsers());
  }, [dispatch]);

  const album = albums.find(a => a.id === parseInt(id));
  const albumPhotos = photos.filter(p => p.albumId === parseInt(id));
  const user = users.find(u => album && u.id === album.userId);

  if (loading) return <Layout><LoadingFallback message="Loading album photos..." /></Layout>;

  return (
    <Layout>
      <div className="p-5 max-w-[1400px] mx-auto">
        {/* User and Album Title Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="font-medium text-lg cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/users/${user.id}`)}>
                    {user.name}
                  </h2>
                  <a href={`mailto:${user.email}`} 
                     className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    {user.email}
                  </a>
                </div>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{album?.title}</h1>
        </div>

        {/* Photo Gallery Section */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {albumPhotos.map(photo => (
              <div key={photo.id} className="group relative flex-none w-[300px]">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-[300px] h-[300px] object-cover rounded-lg shadow-sm group-hover:opacity-75 transition-opacity duration-200"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-40 rounded-lg p-4">
                  <p className="text-white text-center mb-4 text-sm">
                    {photo.title}
                  </p>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-4 py-2 rounded-md text-gray-700 hover:bg-opacity-90 transition-all duration-200"
                  >
                    View Full Size
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
