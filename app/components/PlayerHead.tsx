import { ImgHTMLAttributes } from "react";

export const PlayerHead: React.FC<Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { uuid: string }> = ({ uuid, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} src={`https://mc-heads.net/avatar/${uuid}`} referrerPolicy="no-referrer" style={{ imageRendering: "pixelated" }} />;
};
