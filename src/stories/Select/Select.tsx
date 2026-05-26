import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/cn";

export interface SelectOption {
  label: string;
  value: string;
  children?: SelectOption[];
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
  label?: string;
  leadingIcon?: React.ReactNode;
  multiple?: boolean;
  searchable?: boolean;
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("transition-transform duration-200 flex-shrink-0", className)}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Checkbox = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center justify-center w-4 h-4 rounded border-2 flex-shrink-0 transition-colors duration-150",
      checked ? "bg-green-500 border-green-500" : "border-neutral-300 bg-white"
    )}
  >
    {checked && <CheckMark />}
  </span>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 flex-shrink-0">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

function findOption(opts: SelectOption[], val: string): SelectOption | undefined {
  for (const opt of opts) {
    if (opt.value === val) return opt;
    if (opt.children) {
      const found = findOption(opt.children, val);
      if (found) return found;
    }
  }
  return undefined;
}

function filterOptions(opts: SelectOption[], query: string): SelectOption[] {
  if (!query) return opts;
  const q = query.toLowerCase();
  return opts.reduce<SelectOption[]>((acc, opt) => {
    if (opt.children) {
      const filteredChildren = opt.children.filter(c => c.label.toLowerCase().includes(q));
      if (filteredChildren.length > 0) {
        acc.push({ ...opt, children: filteredChildren });
      } else if (opt.label.toLowerCase().includes(q)) {
        acc.push({ ...opt, children: undefined });
      }
    } else if (opt.label.toLowerCase().includes(q)) {
      acc.push(opt);
    }
    return acc;
  }, []);
}

export const Select = ({
  options,
  value,
  onChange,
  className,
  label = "Select an option",
  leadingIcon,
  multiple = false,
  searchable = false,
}: SelectProps) => {
  const initSelected = (): string[] => {
    if (multiple) return Array.isArray(value) ? value : value ? [value] : [];
    return value && !Array.isArray(value) ? [value] : [];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string[]>(initSelected);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
    if (!isOpen) setSearchQuery("");
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const next = selected.includes(optionValue)
        ? selected.filter(v => v !== optionValue)
        : [...selected, optionValue];
      setSelected(next);
      onChange?.(next);
    } else {
      setSelected([optionValue]);
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const toggleGroup = (val: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  };

  const displayLabel = (): string => {
    if (selected.length === 0) return label;
    if (selected.length === 1) return findOption(options, selected[0])?.label ?? selected[0];
    return `${selected.length} selected`;
  };

  const hasValue = selected.length > 0;
  const filtered = filterOptions(options, searchQuery);

  const renderOption = (option: SelectOption, depth = 0): React.ReactNode => {
    const isSelected = selected.includes(option.value);
    const hasChildren = !!option.children?.length;
    const isExpanded = expandedGroups.has(option.value);

    return (
      <div key={option.value}>
        <div
          role={hasChildren ? "button" : "option"}
          aria-selected={isSelected}
          onClick={() => hasChildren ? toggleGroup(option.value) : handleSelect(option.value)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 cursor-pointer border-b border-neutral-100 text-sm transition-colors duration-100",
            depth > 0 ? "pl-8" : "pl-4",
            hasChildren && "font-medium text-neutral-600 hover:bg-neutral-50",
            !hasChildren && isSelected && !multiple && "bg-green-50 text-green-700",
            !hasChildren && !isSelected && "hover:bg-green-50",
            !hasChildren && isSelected && multiple && "bg-green-50"
          )}
        >
          {multiple && !hasChildren && <Checkbox checked={isSelected} />}
          {leadingIcon && depth === 0 && !hasChildren && (
            <span className="text-neutral-400">{leadingIcon}</span>
          )}
          <span className="flex-1 truncate">{option.label}</span>
          {!hasChildren && isSelected && !multiple && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <path d="M2 7l4 4 6-6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {hasChildren && (
            <ChevronDown className={cn("text-neutral-400", isExpanded && "rotate-180")} />
          )}
        </div>
        {hasChildren && isExpanded && option.children!.map(child => renderOption(child, depth + 1))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative w-64", className)}>
      {/* Trigger */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          "flex items-center gap-2 border rounded-lg w-full bg-white h-10 px-3 cursor-pointer select-none transition-all duration-150",
          isOpen
            ? "border-green-500 ring-2 ring-green-100 shadow-sm"
            : "border-neutral-300 hover:border-green-400"
        )}
      >
        {leadingIcon && <span className="text-neutral-400 flex-shrink-0">{leadingIcon}</span>}
        <span className={cn("flex-1 text-sm truncate", !hasValue ? "text-neutral-500" : "text-neutral-800")}>
          {displayLabel()}
        </span>
        {multiple && selected.length > 0 && (
          <span className="bg-green-100 text-green-700 text-xs font-semibold rounded-full px-1.5 py-0.5 flex-shrink-0 min-w-[20px] text-center">
            {selected.length}
          </span>
        )}
        <ChevronDown className={cn("text-neutral-400", isOpen && "rotate-180")} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-neutral-100">
              <div className="flex items-center gap-2 px-2 py-1.5 border border-neutral-200 rounded-md focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-200 transition-all">
                <SearchIcon />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 text-sm bg-transparent outline-none text-neutral-800 placeholder-neutral-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-neutral-300 hover:text-neutral-500 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="max-h-56 overflow-y-auto" role="listbox">
            {filtered.length === 0 ? (
              <div className="px-4 py-4 text-sm text-neutral-400 text-center">No options found</div>
            ) : (
              filtered.map(option => renderOption(option))
            )}
          </div>

          {multiple && (
            <div className="p-2 border-t border-neutral-100 flex items-center justify-between bg-neutral-50">
              <button
                onClick={() => { setSelected([]); onChange?.([]); }}
                className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors px-2 py-1 rounded hover:bg-neutral-100"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
