import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockIssues, ISSUE_TYPES, PRIORITY_LEVELS, STATUS_TYPES, getPriorityColor, getStatusColor } from '@/lib/helpers'
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'
import ProgressTracker from './components/ui/progress-tracker'

const getFormatedDateTime = (datetime) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(datetime).toLocaleDateString(undefined, options);
}

export default function Issue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(mockIssues.find(issue => issue.id === id));

  const updateStatus = (newStatus) => {
    setIssue(prev => ({ ...prev, status: newStatus }));
  };

  if (!issue) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Issue Not Found</h2>
        <p className="text-gray-600">The issue you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
          </div>
          <div className='flex items-center gap-3 mb-4'>
            <h1 className='text-3xl font-bold text-gray-900'>Issue #{issue.id}</h1>
            <div className='flex gap-2'>
              {issue?.priority && (
                <span className={`border py-1 px-3 rounded-full font-bold uppercase text-sm ${getPriorityColor(issue.priority).str}`}>
                  {PRIORITY_LEVELS[issue.priority]}
                </span>
              )}
              {issue?.status && (
                <span className={`border py-1 px-3 rounded-full font-bold uppercase text-sm ${getStatusColor(issue.status).str}`}>
                  {STATUS_TYPES[issue.status]}
                </span>
              )}
            </div>
          </div>
          <h2 className='text-xl text-gray-700 mb-2'>{ISSUE_TYPES[issue.type] || 'Uncategorized'}</h2>
          <p className='text-gray-600'>{issue.location} • {getFormatedDateTime(issue.datetime)}</p>
        </div>

        {/* Progress Tracker */}
        <div className='mb-8'>
          <Card>
            <CardHeader>
              <CardTitle>Progress Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressTracker currentStatus={issue.status} />
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Media Section */}
            {(issue.image || issue.audio) && (
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {issue.image && (
                    <div>
                      <img
                        src={issue.image}
                        alt={`Issue ${issue.id}`}
                        className="w-full h-64 sm:h-80 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  {issue.audio && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Audio Recording</h4>
                      <audio controls className="w-full">
                        <source src={issue.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Description Section */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{issue.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Issue Details */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className='space-y-3'>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Location:</span>
                    <p className='text-gray-900 font-semibold text-right'>{issue.location}</p>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Date & Time:</span>
                    <p className='text-gray-900 font-semibold text-right text-sm'>{getFormatedDateTime(issue.datetime)}</p>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Type:</span>
                    <p className='text-gray-900 font-semibold text-right'>{ISSUE_TYPES[issue.type] || 'Uncategorized'}</p>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-600 font-medium'>Priority:</span>
                    <p className={`font-semibold text-right ${getPriorityColor(issue.priority).color}`}>
                      {PRIORITY_LEVELS[issue.priority] || 'N/A'}
                    </p>
                  </div>
                  <div className='flex justify-between items-center py-2'>
                    <span className='text-gray-600 font-medium'>Status:</span>
                    <p className={`font-semibold text-right ${getStatusColor(issue.status).color}`}>
                      {STATUS_TYPES[issue.status] || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Details */}
            {issue.assignedTo && (
              <Card>
                <CardHeader>
                  <CardTitle>Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                      <span className='text-gray-600 font-medium'>Assigned to:</span>
                      <p className='text-gray-900 font-semibold text-right'>{issue.assignedTo.name}</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                      <span className='text-gray-600 font-medium'>Area:</span>
                      <p className='text-gray-900 font-semibold text-right'>{issue.assignedTo.area}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <p className='text-sm text-gray-600 mb-4'>Update issue status:</p>
                  <div className='grid grid-cols-1 gap-2'>
                    {issue.status !== 'pending' && (
                      <Button
                        variant="outline"
                        onClick={() => updateStatus('pending')}
                        className="w-full justify-start"
                      >
                        Mark as Pending
                      </Button>
                    )}
                    {issue.status !== 'assigned' && issue.status !== 'pending' && (
                      <Button
                        variant="outline"
                        onClick={() => updateStatus('assigned')}
                        className="w-full justify-start"
                      >
                        Mark as Assigned
                      </Button>
                    )}
                    {issue.status !== 'processing' && ['assigned', 'resolved'].includes(issue.status) && (
                      <Button
                        variant="outline"
                        onClick={() => updateStatus('processing')}
                        className="w-full justify-start"
                      >
                        Mark as In Progress
                      </Button>
                    )}
                    {issue.status !== 'resolved' && (
                      <Button
                        onClick={() => updateStatus('resolved')}
                        className="w-full justify-start bg-green-600 hover:bg-green-700"
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </div>

                  {/* Status History */}
                  <div className='mt-6 pt-4 border-t border-gray-200'>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>Current Status</h4>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status).str}`}>
                      {STATUS_TYPES[issue.status]}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}