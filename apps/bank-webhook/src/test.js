const {Connection,PublicKey, LAMPORTS_PER_SOL} = require('@solana/web3.js')

const publicKey = new PublicKey("8zseWu6HKgyp2drcNKrVbmBNMfeAH7sWDLs5RAttSchY")
const WSS_ENDPOINT = 'wss://fittest-white-sound.solana-devnet.quiknode.pro/2f08cc49d2b9b2116d50437b2105afe0b63b98bb'; // replace with your URL
const HTTP_ENDPOINT = 'https://fittest-white-sound.solana-devnet.quiknode.pro/2f08cc49d2b9b2116d50437b2105afe0b63b98bb'; // replace with your URL

// const connection = new Connection("",'confirmed');

const solanaConnection = new Connection(HTTP_ENDPOINT,{wsEndpoint:WSS_ENDPOINT});

solanaConnection.onAccountChange(publicKey,(accountInfo)=>{
    console.log(accountInfo);
    const lamports = accountInfo.lamports;
    console.log(`Account Info Changed: ${lamports/LAMPORTS_PER_SOL}`);
})

// (async()=>{
//     const ACCOUNT_TO_WATCH = new PublicKey('vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg'); // Replace with your own Wallet Address
//     const subscriptionId = await solanaConnection.onAccountChange(
//         ACCOUNT_TO_WATCH,
//         (updatedAccountInfo) =>
//             console.log(`---Event Notification for ${ACCOUNT_TO_WATCH.toString()}--- \nNew Account Balance:`, updatedAccountInfo.lamports / LAMPORTS_PER_SOL, ' SOL'),
//         "confirmed"
//     );
//     console.log('Starting web socket, subscription ID: ', subscriptionId);
// })()