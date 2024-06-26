import Image, { ImageProps } from "next/image";

export const PlayerHead: React.FC<Omit<ImageProps, "src"> & { uuid: string }> = ({ uuid, ...props }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...props} src={`https://mc-heads.net/avatar/${uuid}`} referrerPolicy="no-referrer" />;
};
