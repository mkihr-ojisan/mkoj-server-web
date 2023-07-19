"use client";

export const CopyServerAddressButton: React.FC = () => {
    return <button onClick={() => navigator.clipboard.writeText("mc.mkihr-ojisan.com")}>コピー</button>;
};
