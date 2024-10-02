'use client';
import { any, unknown } from "zod";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/onRampTransaction";
import Refreshbalance from "../../../components/Refreshbalance";
import { getBalance, getOnRampTransactions } from "../../lib/actions/getBalanceDetails";
import { useState, useEffect } from "react";


interface transactionType {
    time: Date;
    amount: number
    status: any;
    provider: string;
}
export default function Transfer() {
    const [balance, setBalance] = useState({ amount: 0, locked: 0 });
    const [transactions, setTransactions] = useState<transactionType[]>([]);

    const fetchBalance = async () => {
        const balanceData = await getBalance();
        const transactionData = await getOnRampTransactions();
        setBalance(balanceData);

        setTransactions(transactionData);
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    console.log(balance, 'here is the refreshed balance!!');

    return (
        <div className="w-screen">
            <div className="w-full flex justify-between px-4 items-center">
                <span className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Transfer</span>
                <span className="p-2 cursor-pointer text-sm text-white rounded-lg bg-slate-950" onClick={() => {
                    console.log('fetching dataaaa');
                    fetchBalance();
                }} >Refresh</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
