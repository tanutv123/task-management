import React from 'react';

const TableLoadingSkeleton = () => {
    const rows = Array.from({ length: 5 });

    return (
        <div className="p-4">
            {/* Search & Filters */}
            <div className="flex gap-2 mb-4">
                <div className="h-10 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto border rounded">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        {[
                            'STT',
                            'Title',
                            'Description',
                            'Deadline From',
                            'Deadline To',
                            'Status',
                            'Assignee',
                            'Creator',
                            'Created Date',
                            'Completed Date',
                        ].map((header, idx) => (
                            <th
                                key={idx}
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-500"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {rows.map((_, idx) => (
                        <tr key={idx} className="animate-pulse">
                            {Array.from({ length: 10 }).map((_, cellIdx) => (
                                <td key={cellIdx} className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableLoadingSkeleton;
