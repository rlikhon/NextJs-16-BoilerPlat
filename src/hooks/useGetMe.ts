'use client';
import { setUserData } from '@/redux/userSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetMe = (enabled: boolean) => {  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!enabled) {
      return;
    }
  
    const getMe = async () => {
      try {
        const { data } = await axios.get('/api/user/me');
        console.log('User data fetched:', data);
        dispatch(setUserData(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    getMe();
    
  }, [enabled]);
}

export default useGetMe