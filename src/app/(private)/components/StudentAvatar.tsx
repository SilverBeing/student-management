interface StudentAvatarProps {
  name: string;
  size?: number;
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 80%)`;
  return color;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function StudentAvatar({ name, size = 40 }: StudentAvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: stringToColor(name),
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.4,
        color: "#000",
      }}
    >
      {getInitials(name)}
    </div>
  );
}
