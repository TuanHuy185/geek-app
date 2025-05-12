import React from 'react'
import Layout from '../../components/layout/Layout'

export default function AlbumList() {
  const albums = [
    { id: 1, title: 'quidem molestiae enim', user: { initials: 'LG', name: 'Leanne Graham' } },
    { id: 2, title: 'sunt qui excepturi placeat culpa', user: { initials: 'LG', name: 'Leanne Graham' } },
    { id: 3, title: 'omnis laborum odio', user: { initials: 'LG', name: 'Leanne Graham' } },
    // ...more albums
  ];

  return (
    <Layout>
      <div className="p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left border-b">ID</th>
              <th className="py-3 px-4 text-left border-b">Title</th>
              <th className="py-3 px-4 text-left border-b">User</th>
              <th className="py-3 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map(album => (
              <tr key={album.id}>
                <td className="py-3 px-4 border-b">{album.id}</td>
                <td className="py-3 px-4 border-b">{album.title}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                      {album.user.initials}
                    </div>
                    <span>{album.user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b">
                  <button className="px-4 py-1.5 text-blue-600 font-medium hover:bg-blue-50 rounded">
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
