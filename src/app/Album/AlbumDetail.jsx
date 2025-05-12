import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi";
import { TiDocumentText } from "react-icons/ti";
import Layout from "../../components/layout/Layout";
import LoadingFallback from "../../components/LoadingFallback";
import { useDocumentTitle } from "../../App";
import { fetchPhotos } from "../../store/AlbumSlice";
import { fetchUsers } from "../../store/UserSlice";

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos, albums, loading } = useSelector((state) => state.albums);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchPhotos());
    dispatch(fetchUsers());
  }, [dispatch]);

  const album = albums.find((a) => a.id === parseInt(id));
  const albumPhotos = photos.filter((p) => p.albumId === parseInt(id));
  const user = users.find((u) => album && u.id === album.userId);

  const albumId = album?.id || id;
  useDocumentTitle(`#${albumId} Show Album`);

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading)
    return (
      <Layout>
        <LoadingFallback message="Loading album photos..." />
      </Layout>
    );

  return (
    <Layout>
      {/* Section Header */}
      <div className="flex flex-col gap-1 mb-6">
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
      <div className="p-5 max-w-[1400px] mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="border border-gray-200 rounded-md p-5">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-5">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2
                      className="font-bold text-sm cursor-pointer text-blue-500 hover:text-blue-400"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      {user.name}
                    </h2>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:text-blue-400 cursor-pointer"
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
          <div className="overflow-x-auto py-4">
            <div className="flex flex-wrap gap-4">
              {albumPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative flex-none w-[150px]"
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-[180px] h-[80px] object-cover rounded-lg shadow-sm group-hover:opacity-75 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-40 rounded-lg p-3">
                    <p className="text-white text-center mb-3 text-xs line-clamp-2">
                      {photo.title}
                    </p>
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-opacity-90 transition-all duration-200"
                    >
                      View Full Size
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
