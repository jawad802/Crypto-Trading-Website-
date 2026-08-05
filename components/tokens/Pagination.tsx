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
                className="px-4 py-2 bg-[#16191e] border border-gray-800 rounded-lg text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
                ← Previous
            </button>

            <span className="text-sm text-gray-400">Page {page}</span>

            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
                className="px-4 py-2 bg-[#16191e] border border-gray-800 rounded-lg text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
                {loading ? "Loading..." : "Next →"}
            </button>
        </div>
    );
}