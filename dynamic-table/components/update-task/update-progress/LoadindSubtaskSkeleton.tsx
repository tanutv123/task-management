import React from 'react';

const LoadingSubtaskSkeleton = () => {
    const skeletons = Array.from({ length: 4 });

    return (
        <div className="p-4 border rounded space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Note */}
            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mb-2" />

            {/* Subtask Skeletons */}
            {skeletons.map((_, i) => (
                <div
                    key={i}
                    className="flex items-center p-4 border rounded space-x-4 animate-pulse"
                >
                    {/* Drag icon placeholder */}
                    <div className="h-4 w-4 bg-gray-300 rounded" />

                    {/* Label + Input */}
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-100 rounded" />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-300 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>

                    {/* Delete icon */}
                    <div className="h-5 w-5 bg-gray-300 rounded-full" />
                </div>
            ))}
        </div>
    );
};

export default LoadingSubtaskSkeleton;
