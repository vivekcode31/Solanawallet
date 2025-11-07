import { useState, useEffect } from "react";

const PhantomWallet = ({ setWalletAddress }) => {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect({ onlyIfTrusted: true })
                .then(res => {
                    setWallet(res.publicKey.toString());
                    setWalletAddress(res.publicKey.toString());
                })
                .catch(() => console.log("Wallet not connected"));
        }
    }, [setWalletAddress]);

    const connectWallet = async () => {
        try {
            if (!window.solana) return alert("Install Phantom Wallet!");
            const res = await window.solana.connect();
            setWallet(res.publicKey.toString());
            setWalletAddress(res.publicKey.toString());
        } catch (error) {
            console.error("Connection failed:", error);
        }
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <div>
                <h2 className="text-lg font-medium">Wallet</h2>
                <p className="text-sm text-slate-400">Connect Phantom to get started</p>
            </div>
            {wallet ? (
                <div className="w-full rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                    Connected: <span className="break-all font-mono text-xs">{wallet}</span>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 active:opacity-80"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M21 7H7a4 4 0 0 0 0 8h14v2a2 2 0 0 1-2 2H7A6 6 0 1 1 7 5h12a2 2 0 0 1 2 2v2Zm0 2h-6a2 2 0 1 0 0 4h6V9Z" />
                    </svg>
                    Connect Phantom
                </button>
            )}
        </div>
    );
};

export default PhantomWallet;
