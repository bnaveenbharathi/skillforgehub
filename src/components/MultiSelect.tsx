import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const MultiSelect = ({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = "Select options...", 
  required = false,
  error 
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  const selectedLabels = value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200",
            "bg-background/50 backdrop-blur-sm min-h-[48px]",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            isOpen && "shadow-[var(--shadow-soft)] border-primary/50",
            !isOpen && "border-border hover:border-border/80",
            error && "border-destructive"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedLabels.map((label, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-lg bg-primary/10 text-primary text-sm"
                    >
                      {label}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-primary/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(value[index]);
                        }}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-background border border-border rounded-xl shadow-[var(--shadow-medium)] backdrop-blur-sm">
            <div className="max-h-60 overflow-auto p-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors",
                    "hover:bg-accent/50",
                    value.includes(option.value) && "bg-primary/10 text-primary"
                  )}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={cn(
                      "w-4 h-4 border-2 rounded flex items-center justify-center",
                      value.includes(option.value) ? "border-primary bg-primary" : "border-border"
                    )}>
                      {value.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span>{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default MultiSelect;