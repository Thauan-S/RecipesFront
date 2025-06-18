import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onValueChange, options, placeholder }) => (
  <div>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || label} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {options.map((opt) => (
          <SelectItem  key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FormSelect; 