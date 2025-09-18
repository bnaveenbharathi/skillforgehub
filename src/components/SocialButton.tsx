import { cn } from "@/lib/utils";

interface SocialButtonProps {
  provider: "google" | "linkedin";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const SocialButton = ({ provider, onClick, children, className }: SocialButtonProps) => {
  const providerStyles = {
    google: "border-red-200 hover:border-red-300 hover:bg-red-50/50 text-red-700",
    linkedin: "border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 text-blue-700"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200",
        "bg-background/80 backdrop-blur-sm font-medium",
        "hover:shadow-[var(--shadow-soft)] hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        providerStyles[provider],
        className
      )}
    >
      {children}
    </button>
  );
};

export default SocialButton;