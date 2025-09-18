export const ISSUE_TYPES = {
    pothole: 'Pothole',
    garbage: 'Garbage',
    street_light: 'Street Light',
    traffic_signal: 'Traffic Signal',
    water_leak: 'Water Leak'
};

export const PRIORITY_LEVELS = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
};

export const STATUS_TYPES = {
    pending: 'Pending',
    assigned: 'Assigned',
    processing: 'In Progress',
    resolved: 'Resolved'
};

export const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
        case 'high':
            return {
                color: 'text-red-500',
                str: 'bg-red-500/20 text-red-600 border-red-600'
            };
        case 'medium':
            return {
                color: 'text-yellow-500',
                str: 'bg-yellow-500/20 text-yellow-600 border-yellow-600'
            };
        case 'low':
            return {
                color: 'text-green-500',
                str: 'bg-green-500/20 text-green-600 border-green-600'
            };
        default:
            return {
                color: 'text-gray-500',
                str: 'bg-gray-500/20 text-gray-600 border-gray-600'
            };
    }
};

export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return {
                color: 'text-yellow-500',
                str: 'bg-yellow-500/20 text-yellow-600 border-yellow-600'
            };
        case 'assigned':
            return {
                color: 'text-purple-500',
                str: 'bg-purple-500/20 text-purple-600 border-purple-600'
            };
        case 'processing':
            return {
                color: 'text-blue-500',
                str: 'bg-blue-500/20 text-blue-600 border-blue-600'
            };
        case 'resolved':
            return {
                color: 'text-green-500',
                str: 'bg-green-500/20 text-green-600 border-green-600'
            };
        default:
            return {
                color: 'text-gray-500',
                str: 'bg-gray-500/20 text-gray-600 border-gray-600'
            };
    }
};

export const mockIssues = [
    {
        id: '101',
        description: 'There is a large pothole on Main Street causing traffic disruptions.',
        type: 'pothole',
        image: 'https://imgs.search.brave.com/B2qDUV1HAvkiISwYT4c_4sCuITkegLxkPrkjSqgBB7M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODEz/OTQ0Mzk4L3Bob3Rv/L211bWJhaS1pbmRp/YS10aGUtbmV3bHkt/aW5hdWd1cmF0ZWQt/c2lvbi1kYWRhci1m/bHlvdmVyLWhhcy1k/ZXZlbG9wZWQtdW5l/dmVuLXN0cmV0Y2hl/cy1hbmQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPV9UVHFh/LW9FSmFNVkZqd0dU/cXFDVmdQR1NsaUpz/MVdtQjFBUXAyb3Bt/Mmc9',
        audio: '/audio.mp3',
        location: 'Main Street',
        datetime: '2024-10-01T10:30:00Z',
        priority: 'medium',
        status: 'processing',
        assignedTo: {
            id: 'dept1',
            name: 'City Maintenance Team',
            area: 'Downtown'
        }
    },
    {
        id: '102',
        description: 'There is a large water leak on Main Street causing disruptions.',
        type: 'water_leak',
        image: 'https://imgs.search.brave.com/B2qDUV1HAvkiISwYT4c_4sCuITkegLxkPrkjSqgBB7M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODEz/OTQ0Mzk4L3Bob3Rv/L211bWJhaS1pbmRp/YS10aGUtbmV3bHkt/aW5hdWd1cmF0ZWQt/c2lvbi1kYWRhci1m/bHlvdmVyLWhhcy1k/ZXZlbG9wZWQtdW5l/dmVuLXN0cmV0Y2hl/cy1hbmQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPV9UVHFh/LW9FSmFNVkZqd0dU/cXFDVmdQR1NsaUpz/MVdtQjFBUXAyb3Bt/Mmc9',
        audio: '/audio.mp3',
        location: 'Main Street',
        datetime: '2024-10-01T10:30:00Z',
        priority: 'high',
        status: 'pending',
        assignedTo: null
    },
];