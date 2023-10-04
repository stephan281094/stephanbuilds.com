import fs from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const inter = fs.readFile("src/assets/fonts/Inter-Regular.woff");

export async function generateOgImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eee",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          color: "#111",
          fontWeight: 600,
          padding: 80,
        }}
      >
        <div style={{ margin: 0, fontSize: 56, opacity: 0.75 }}>
          stephanbuilds.com
        </div>
        <div style={{ marginTop: "auto", fontSize: 80 }}>{title}</div>
        <div style={{ marginTop: 24, fontSize: 48 }}>{description}</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await inter,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return png;
}
