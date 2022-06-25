const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

//  Wallet holds public and secret key
const wallet = new Keypair();

//  Get public key
const publicKey = new PublicKey(wallet._keypair.publicKey);

// Get secret key
const secretKey = wallet._keypair.secretKey;

// Log keys
console.log(publicKey);
console.log(secretKey);

// Get wallet balance
const getWalletBalance = async() => {
    try {
        // create connection to get balance
        // ClusterApiUrl provides URL for devnet
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        //  Get the wallet balance using the public key
        const walletBalance = await connection.getBalance(publicKey);

        //  Log the wallet balance
        console.log(`Wallet balance is ${walletBalance}`);

    } catch (err) {
        console.error(err);
    }
}

// Airdrop SOL
const airdropSol = async() => {
    try {
        // Create connect
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        //  Request airdrop in Lamports - 2 SOL * LAMPORTS_PER_SOL
        const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        // Confirm transaction
        await connection.confirmTransaction(fromAirdropSignature);
        await connection.Trans

    } catch (err) {
        console.error(err);
    }
}

// Function to call getWalletBalance
const main = async() => {
    await getWalletBalance();
    await airdropSol();
    await getWalletBalance();
}

//  Run Main
main();