import { TrendingUp, Target, Users, Trophy, Calendar, Briefcase } from "lucide-react";

interface ProgressCardProps {
  title: string;
  value: number;
  total?: number;
  icon: React.ComponentType<any>;
  color: "primary" | "success" | "warning" | "info";
  trend?: number;
}

const ProgressCard = ({ title, value, total, icon: Icon, color, trend }: ProgressCardProps) => {
  const colorClasses = {
    primary: "from-primary/10 to-primary-glow/10 text-primary border-primary/20",
    success: "from-green-500/10 to-primary-glow/10 text-green-600 border-green-500/20",
    warning: "from-yellow-500/10 to-primary-glow/10 text-yellow-600 border-yellow-500/20",
    info: "from-blue-500/10 to-primary-glow/10 text-blue-600 border-blue-500/20"
  };

  const percentage = total ? (value / total) * 100 : 0;

  return (
    <div className="card-feature group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border flex items-center justify-center group-hover:glow-primary transition-all duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">{value}{total && `/${total}`}</h3>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        
        {total && (
          <div className="w-full bg-accent/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r transition-all duration-500 ${
                color === 'primary' ? 'from-primary to-primary-glow' :
                color === 'success' ? 'from-green-500 to-green-400' :
                color === 'warning' ? 'from-yellow-500 to-yellow-400' :
                'from-blue-500 to-blue-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;