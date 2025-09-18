import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from './ui/card';
import { ISSUE_TYPES, PRIORITY_LEVELS, STATUS_TYPES, getPriorityColor, getStatusColor } from '@/lib/helpers';

const getFormatedDateTime = (datetime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(datetime).toLocaleDateString(undefined, options);
}

export default function IssueCard({ issue }) {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center gap-2'>
                    {issue?.priority && (<span className={`border py-1 px-2 rounded-sm font-bold uppercase text-xs ${getPriorityColor(issue.priority).str}`}>{PRIORITY_LEVELS[issue.priority]}</span>)}
                    {issue?.status && (<span className={`border py-1 px-2 rounded-sm font-bold uppercase text-xs ${getStatusColor(issue.status).str}`}>{STATUS_TYPES[issue.status]}</span>)}
                </div>
                <CardTitle>{ISSUE_TYPES[issue.type] || 'Uncategorized'}</CardTitle>
                <p className='text-sm'>{issue.location}, {getFormatedDateTime(issue.datetime)}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {issue.image && (
                    <img src={issue.image} alt={`Issue ${issue.id}`} className="w-full h-48 object-cover rounded-md mb-4" />
                )}
                {issue.audio && (
                    <audio controls className="w-full mb-4">
                        <source src={issue.audio} type="audio/mpeg" />
                    </audio>
                )}
                <p>{issue.description}</p>
                <p className='font-medium'>Details:</p>
                <div className="text-sm space-y-2">
                    <div className='flex items-center justify-between gap-2'>
                        <span className='text-muted-foreground'>Location:</span>
                        <p className='font-medium'>{issue.location}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <span className='text-muted-foreground'>Date & Time:</span>
                        <p className='font-medium'>{getFormatedDateTime(issue.datetime)}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <span className='text-muted-foreground'>Type:</span>
                        <p className='font-medium'>{ISSUE_TYPES[issue.type] || 'Uncategorized'}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <span className='text-muted-foreground'>Priority:</span>
                        <p className={`font-medium ${getPriorityColor(issue.priority).color}`}>{PRIORITY_LEVELS[issue.priority] || 'N/A'}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <span className='text-muted-foreground'>Status:</span>
                        <p className={`font-medium ${getStatusColor(issue.status).color}`}>{STATUS_TYPES[issue.status] || 'N/A'}</p>
                    </div>

                    {issue.assignedTo && (
                        <>
                            <div className='flex items-center justify-between gap-2'>
                                <span className='text-muted-foreground'>Assigned to:</span>
                                <p className='font-medium'>{issue.assignedTo.name}</p>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <span className='text-muted-foreground'>Area:</span>
                                <p className='font-medium'>{issue.assignedTo.area}</p>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}