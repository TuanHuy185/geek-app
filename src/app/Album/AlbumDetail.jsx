import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi";
import { TiDocumentText } from "react-icons/ti";
import { HiEye } from "react-icons/hi";
import Layout from "../../components/layout/Layout";
import LoadingFallback from "../../components/LoadingFallback";
import { useDocumentTitle } from "../../App";
import { fetchPhotos, fetchAlbums } from "../../store/AlbumSlice";
import { fetchUsers, getAvatarUrl } from "../../store/UserSlice";
import ImageViewer from "../../components/ImageViewer";

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos, albums, loading } = useSelector((state) => state.albums);
  const { users } = useSelector((state) => state.users);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums());
      dispatch(fetchPhotos());
      dispatch(fetchUsers());
    }
  }, [dispatch, id]);

  const album = albums.find((a) => a.id === parseInt(id));
  const albumPhotos = photos.filter((p) => p.albumId === parseInt(id));
  const user = users.find((u) => album && u.id === album.userId);

  const albumId = album?.id || id;
  useDocumentTitle(`#${albumId} Show Album`);

  const handleBack = () => {
    navigate(-1); 
  };

  const handlePhotoClick = (index) => {
    setCurrentPhotoIndex(index);
    setViewerOpen(true);
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => 
      prev === albumPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? albumPhotos.length - 1 : prev - 1
    );
  };

  if (loading || !album || !user) {
    return (
      <Layout>
        <LoadingFallback message="Loading album details..." />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Section Header */}
      <div className="flex flex-col gap-1 mb-3 mx-6">
        <div className="flex items-center gap-2">
          <TiDocumentText className="w-4 h-4" />
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            Albums
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
          <h1 className="text-xl font-semibold text-gray-800">Show Album</h1>
        </div>
      </div>
      <div className="p-6 mx-6 max-w-[1400px] bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="border border-gray-200 rounded-md p-5">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-5">
              {user && (
                <div className="flex items-star gap-3">
                  <img 
                    src={getAvatarUrl(user.name, { size: 32 })}
                    alt={`${user.name}'s avatar`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2
                      className="text-blue-500 hover:text-blue-400 font-bold transition-colors cursor-pointer"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      {user.name}
                    </h2>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-xl font-semibold text-gray-800 pt-4">{album?.title}</h1>
          </div>

          {/* Photo Gallery Section */}
          <div className="overflow-x-auto pb-4">
            <div className="flex flex-wrap gap-4">
              {albumPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative flex-none w-[150px] cursor-pointer"
                  onClick={() => handlePhotoClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePhotoClick(index)}
                  aria-label={`Preview ${photo.title}`}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-[180px] h-[80px] object-cover rounded-lg shadow-sm group-hover:opacity-50 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50">
                    <div className="flex items-center gap-2">
                      <HiEye className="w-[18px] h-[18px] text-white/80" />
                      <span className="text-white/80 text-[13px]">Preview</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        currentImage={albumPhotos[currentPhotoIndex]?.url}
        onNext={handleNext}
        onPrev={handlePrev}
        totalImages={albumPhotos.length}
        currentIndex={currentPhotoIndex}
      />
    </Layout>
  );
}
