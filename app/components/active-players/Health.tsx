import { BsHeart, BsHeartFill, BsHeartHalf } from "react-icons/bs";

export const Health: React.FC<{ health: number; maxHealth: number; color?: string; fontSize?: string }> = ({
    health,
    maxHealth,
    color,
    fontSize,
}) => {
    const intHealth = Math.ceil(health);
    const intMaxHealth = Math.ceil(maxHealth);
    const heartCount = Math.floor(intHealth / 2);
    const totalHearts = Math.ceil(intMaxHealth / 2);
    const hasHalfHeart = intHealth % 2 === 1;

    return (
        <div style={{ display: "flex", alignItems: "center", color, fontSize }}>
            {[...Array(heartCount)].map((_, i) => (
                <BsHeartFill key={i} />
            ))}
            {hasHalfHeart && <BsHeartHalf />}
            {[...Array(totalHearts - heartCount - (hasHalfHeart ? 1 : 0))].map((_, i) => (
                <BsHeart key={i} />
            ))}
        </div>
    );
};
