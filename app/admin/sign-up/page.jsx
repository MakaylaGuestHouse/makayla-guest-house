import SignUpPage from '@/components/pages/admin/SignUp'
import { fetchAdminUser } from '@/server/adminUser.action';
import React from 'react'

const initialData = {
   firstName: '',
   lastName: '',
   email: '',
   password: '',
   confirmPassword: '',
   role: 'Select Role',
   isSuperAdmin: false
}

const page = async ({ searchParams }) => {
   const id = searchParams?.id;
   let userToUpdate = initialData;

   if (id) {
      userToUpdate = await fetchAdminUser(id);
   }

   return (
      <div><SignUpPage userToUpdate={userToUpdate} userId={userToUpdate?._id} /></div>
   )
}

export default page