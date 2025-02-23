import { useEffect, useState } from "react";

type NotificationColor = "orange" | "red" | "green" | "blue"; // Definindo um tipo para as cores

const Notification = ({
  color = "orange",
  title = "",
  message = "",
  duration = 5000,
}: {
  color?: NotificationColor;
  title?: string;
  message?: string;
  duration?: number;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const colorClasses: Record<NotificationColor, string> = {
    orange: "bg-orange-100 border-l-4 border-orange-500 text-orange-700",
    red: "bg-red-100 border-l-4 border-red-500 text-red-700",
    green: "bg-green-100 border-l-4 border-green-500 text-green-700",
    blue: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
  };

  return (
    visible && (
      <div
        className={`fixed bottom-5 right-5 p-4 ${colorClasses[color]} rounded-lg shadow-lg transition-all transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        role="alert"
      >
        <p className="font-bold">{title}</p>
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
