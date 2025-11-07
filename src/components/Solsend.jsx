import { useState } from "react";
import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";

const NETWORK = clusterApiUrl("devnet");

const SendSol = ({ sender }) => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const sendSol = async () => {
        try {
            if (!sender) return alert("Connect your wallet first!");
            if (!recipient) return alert("Enter a valid recipient address!");
            if (!amount || isNaN(Number(amount))) return alert("Enter a valid amount!");

            const provider = window.solana;
            if (!provider) return alert("Phantom Wallet not found!");

            const connection = new Connection(NETWORK);
            const senderPubKey = new PublicKey(sender);
            const recipientPubKey = new PublicKey(recipient);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: senderPubKey,
                    toPubkey: recipientPubKey,
                    lamports: Number(amount) * 1e9, // Convert SOL to lamports
                })
            );

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = senderPubKey;

            const signedTransaction = await provider.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            await connection.confirmTransaction(signature);

            console.log("Transaction successful:", signature);
            alert(`Transaction successful! Tx: ${signature}`);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-lg font-medium">Send SOL</h2>
                <p className="text-sm text-slate-400">Transfer SOL securely via Phantom</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                <input
                    type="text"
                    placeholder="Recipient Wallet Address"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Amount (SOL)"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400/40 focus:outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <button
                    onClick={sendSol}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 active:opacity-80"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M3 12h12.586l-4.293-4.293 1.414-1.414L19.414 12l-6.707 6.707-1.414-1.414L15.586 13H3v-1Z" />
                    </svg>
                    Send SOL
                </button>
            </div>
        </div>
    );
};

export default SendSol;
