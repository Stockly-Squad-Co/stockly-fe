'use client';

import LogoLoader from '@/components/Common/Loaders/logo.loader';
import { useSession } from 'next-auth/react';
import React, { FC, ReactNode, useEffect } from 'react';
import useUserStore from '../store/user.store';
import { getUser } from '../services/user.service';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { status } = useSession();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  if (status === 'loading' || !user) return <LogoLoader />;

  return <div>{children}</div>;
};

export default AuthProvider;
