import "@/app/global.css";

export const metadata = {
  title: "Rewire Habituality",
  description:
    "Rewire Habituality helps you break old patterns and build powerful new habits through mindful, trackable change.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
