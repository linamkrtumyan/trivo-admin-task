import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../store/store';
import { fetchUsers } from '../../features/user/userSlice';
import UserTable from './components/UserTable';
import Navbar from './layout/Navbar';

export function UserPage() {
  const dispatch = useAppDispatch();
  const userId = 1; // Example user ID
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
       <Navbar/>
       <UserTable users={users}/>
    </div>
  );
}

