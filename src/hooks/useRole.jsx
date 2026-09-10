import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setRoleLoading(false);
        })
        .catch(() => setRoleLoading(false));
    } else if (!authLoading) {
      setRoleLoading(false);
    }
  }, [user, authLoading, axiosPublic]);

  return [role, roleLoading];
};

export default useRole;