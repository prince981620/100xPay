"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransaction";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "http://localhost:3004/?token="
}, {
    name: "Axis Bank",
    redirectUrl: "http://localhost:3004/?token="
}];

export const AddMoney = () => {
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "") ;
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount,setAmount] = useState(0);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            if(/^\d*\.?\d*$/.test(value) && value.length < 6){
              setAmount(Number(value));
            }
        }} amount={amount}/>
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
        <Button  onClick={async () => {
    const token = await createOnrampTransaction(provider, amount * 100);
    console.log("this is the response token",token);
    // const token = response.token

    // Get the screen width and height
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Define the desired window dimensions
    const width = 800; // Adjust the width
    const height = 600; // Adjust the height

    // Calculate the position to center the window
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    // Open a new centered window with the specified dimensions
    window.open(redirectUrl+token, 'miniTab', `width=${width},height=${height},left=${left},top=${top}`);
}}> Add money
</Button>
        </div>
    </div>
</Card>
}