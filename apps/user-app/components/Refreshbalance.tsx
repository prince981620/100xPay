'use client';
import { getBalance,getOnRampTransactions } from '../app/(dashboard)/transfer/page';

import React from 'react'

const Refreshbalance = (fetchBlance) => {
  return (
    <span className="p-2 cursor-pointer text-sm text-white rounded-lg bg-slate-950" onClick={() => {
        console.log('fetching dataaaa');
        fetchBlance;
    }} >Refresh</span>
)
}

export default Refreshbalance