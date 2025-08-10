import "@/app/global.css";

export const metadata = {
  title: "Habit Tracker",
  description: "Personalised Habit Tracker",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
