'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import useGetMe from './hooks/useGetMe';

const InitUser = () => {
    const { status } = useSession();
    console.log('InitUser status:', status);
    useGetMe(status == "authenticated");
    
    return null;
}

export default InitUser
