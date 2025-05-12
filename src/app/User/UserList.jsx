import React from 'react'
import Layout from '../../components/layout/Layout'
import { useDocumentTitle } from '../../App'
import { HiEye } from 'react-icons/hi'

export default function UserList() {
  useDocumentTitle('Users');

  const users = [
    { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org', initials: 'LG' },
    { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', phone: '010-692-6593 x09125', website: 'anastasia.net', initials: 'EH' },
    { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', website: 'ramiro.info', initials: 'CB' },
  ];

  return (
    <Layout>
      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">Users</h1>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left border-b font-semibold">ID</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Avatar</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Name</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Email</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Phone</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Website</th>
              <th className="py-3 px-4 text-left border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 border-b font-medium">{user.id}</td>
                <td className="py-3 px-4 border-b">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm transform hover:scale-110 transition-transform duration-200 shadow-sm cursor-pointer">
                    {user.initials}
                  </div>
                </td>
                <td className="py-3 px-4 border-b font-medium">
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b">
                  <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-700 transition-colors duration-150">
                    {user.email}
                  </a>
                </td>
                <td className="py-3 px-4 border-b hover:text-gray-900 transition-colors duration-150">
                  {user.phone}
                </td>
                <td className="py-3 px-4 border-b">
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-700 transition-colors duration-150">
                    {user.website}
                  </a>
                </td>
                <td className="py-3 px-4 border-b">
                  <button className="px-4 py-1.5 text-gray-600 font-medium border border-gray-300 rounded-md 
                                   hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 
                                   transition-all duration-200 inline-flex items-center gap-2 hover:shadow-sm">
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
