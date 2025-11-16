import { useState } from "react";
import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";

const NETWORK = clusterApiUrl("devnet");

const SendSol = ({ sender }) => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [txSignature, setTxSignature] = useState(null);
    const [error, setError] = useState(null);

    const sendSol = async () => {
        try {
            setError(null);
            setTxSignature(null);

            if (!sender) {
                setError("Please connect your wallet first!");
                return;
            }
            if (!recipient) {
                setError("Please enter a valid recipient address!");
                return;
            }
            if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                setError("Please enter a valid amount!");
                return;
            }

            const provider = window.solana;
            if (!provider) {
                setError("Phantom Wallet not found!");
                return;
            }

            setIsSending(true);

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
            setTxSignature(signature);
            setRecipient("");
            setAmount("");
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.message || "Transaction failed. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-7">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-1 flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white/90 mb-1">Send Transaction</h2>
                    <p className="text-sm text-white/50 font-medium">Transfer SOL securely</p>
                </div>
            </div>

            {/* Transaction Form */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Solana wallet address..."
                        className="cyber-input"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        disabled={isSending}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                        Amount (SOL)
                    </label>
                    <input
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="0.0000"
                        className="cyber-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={isSending}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                        Network Fee
                    </label>
                    <div className="cyber-input bg-white/5 text-white/50 cursor-not-allowed">
                        ~0.000005 SOL
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-5">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-red-400 font-medium">{error}</p>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {txSignature && (
                <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-5">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-green-400 mb-2">Transaction Successful!</p>
                            <p className="text-xs text-green-400/70 font-mono break-all leading-relaxed">{txSignature}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Send Button */}
            <div className="pt-3">
                <button
                    onClick={sendSol}
                    disabled={isSending || !recipient || !amount}
                    className="holo-button w-full sm:w-auto sm:min-w-[220px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Send Transaction</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SendSol;
