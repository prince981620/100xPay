'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { LockIcon, AlertTriangleIcon, ShieldIcon, CreditCardIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import visa from "../lib/visa-logo.png";
import amexcard from "@/lib/card.png";
import mastercard from "@/lib/logo.png";
import axios from "axios"
import Image from 'next/image'

export default function BankPaymentConfirmation() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [amount,setAmount] = useState(0);
  const [error,setError] = useState('');
  const [loading,setLoading]  = useState(false);

  // const [error, setError] = useState<string | null>(null); // For error handling
  
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  
  const verifyToken = async(token:string)=>{
    const res = await axios.get(`http://localhost:8080/verify/?token=${token}`);
    setAmount(res?.data?.amount)
  }
  useEffect(() => {
    if(token){
      verifyToken(token);
    }
  }, [token]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try{
      setLoading(true);
      await axios.get(`http://localhost:8080/finalize/?token=${token}`);
      setLoading(false);


      setTimeout(() => {
        window.close();        
      },5000)
      console.log('Form submitted', { mobileNumber, agreed, amount })
    }
    catch(e){

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Secure Payment Confirmation</CardTitle>
            <ShieldIcon className="h-6 w-6 text-green-600" />
          </div>
          <CardDescription>Please confirm your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">Amount to be deducted:</span>
                  <span className="text-lg font-bold text-blue-700">₹{(amount/100).toFixed(2)}</span>
                </div>
                <div className="mt-2 text-xs text-blue-500">
                  <CreditCardIcon className="inline-block h-4 w-4 mr-1" />
                  This amount will be deducted from your linked account
                </div>
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <Alert variant="default">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Never share your OTP or bank details with anyone. Bank officials will never ask for this information.
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="text-xs text-gray-500">
                By proceeding, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. This transaction is protected by bank-level security and encryption.
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={!agreed}>
              <LockIcon className="h-4 w-4 mr-2" />
              Confirm Payment of ₹{(amount/100).toFixed(2)}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-gray-500">
            © 2024 Secure Bank. All rights reserved.
          </div>
          <div className="flex space-x-2">
            <Image src={visa} height={30} width={30} alt="Visa" className="h-5" />
            <Image src={amexcard} height={30} width={30} alt="Amex" className="h-5" />
            <Image src={mastercard} height={30} width={30} alt="Master" className="h-5" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

