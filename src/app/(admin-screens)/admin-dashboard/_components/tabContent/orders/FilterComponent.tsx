import React from "react";

interface FilterComponentProps {
  selectItems: string[];
}

export default function FilterComponent({ selectItems }: FilterComponentProps) {
  return (
    <div className="flex flex-col gap-1">
      <select
        className="
          bg-[#F3F3F5] 
          px-3 py-2 
          rounded-lg 
          text-sm 
          outline-none
          cursor-pointer
        "
      >
        {selectItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
