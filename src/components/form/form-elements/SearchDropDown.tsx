import { useEffect, useRef, useState } from "react";

export default function SearchDropdown({
    value,
    onChange,
    fetchOptions,
    placeholder = "Search...",
    labelKey = "name",
    label,
}: {
    value: any;
    label:string
    onChange: (value: any) => void;
    fetchOptions: (query: string) => Promise<any[]>;
    placeholder?: string;
    labelKey?: string;
}) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any[]>([]);

    const debounceRef = useRef<any>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // sync selected value → input
    useEffect(() => {
        if (value) {
            setQuery(value?.[labelKey] || "");
        } else {
            setQuery("");
        }
    }, [value]);

    // outside click
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // debounce search
    useEffect(() => {
        if (!query.trim()) return;

        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await fetchOptions(query);
                setOptions(data || []);
                setOpen(true);
            } finally {
                setLoading(false);
            }
        }, 400);
    }, [query]);

    const handleSelect = (item: any) => {
        onChange(item);
        setQuery(item?.[labelKey] || "");
        setOpen(false);
        setOptions([]);
    };

    const handleClear = () => {
        onChange(null);
        setQuery("");
        setOptions([]);
    };

    return (
        <div className="relative w-full" ref={wrapperRef as any}>
            {/* input */}
            <label className = 'mb-2'>{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => options.length && setOpen(true)}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm"
                />

                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-2 text-gray-400"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {loading && (
                        <div className="px-4 py-2 text-sm">Loading...</div>
                    )}

                    {!loading &&
                        options.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => handleSelect(item)}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                            >
                                {item?.[labelKey]}
                            </div>
                        ))}

                    {!loading && query && options.length === 0 && (
                        <div className="px-4 py-2 text-sm">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}