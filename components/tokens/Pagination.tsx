interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
}

export default function Pagination({ page, setPage, loading }: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
                ← Previous
            </button>

            <span className="text-sm text-slate-500">Page {page}</span>

            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
                {loading ? "Loading..." : "Next →"}
            </button>
        </div>
    );
}