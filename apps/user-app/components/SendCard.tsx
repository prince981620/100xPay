"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading,setLoading] = useState(false);

    return <div className="h-[70vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    {loading && <center>
                    <div className="">
                        Loading...
                    </div>
                    </center>}
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                            try{
                                setLoading(true);
                                const response = await p2pTransfer(number,Number(amount)*100)
                                alert("Transaction Successfull");
                                 setLoading(false);
                            }catch(e){
                                console.log("failed",e);
                                alert(e);
                            }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}