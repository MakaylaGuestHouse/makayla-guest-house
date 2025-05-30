import UsersPage from '@/components/pages/admin/Users';
import { fetchAdminUsers } from '@/server/adminUser.action';
import React from 'react'

const page = async () => {
   const users = await fetchAdminUsers({ query: '', limit: 50, page: 1 });
   return (
      <div>
         <UsersPage usersData={users.data} />
      </div>
   )
}

export default page