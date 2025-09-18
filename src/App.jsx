import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MapPin, Settings, Bell } from 'lucide-react'
import { ISSUE_TYPES, PRIORITY_LEVELS, STATUS_TYPES, getPriorityColor, getStatusColor } from '@/lib/helpers';
import { useNavigate } from 'react-router-dom'
import { mockIssues } from '@/lib/helpers'


export default function App() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all'
  });

  const filteredIssues = mockIssues.filter(issue => {
    return (selectedFilters.category === 'all' || issue.type === selectedFilters.category) &&
      (selectedFilters.priority === 'all' || issue.priority === selectedFilters.priority) &&
      (selectedFilters.status === 'all' || issue.status === selectedFilters.status);
  });

  const handleRowClick = (issueId) => {
    navigate(`/issue/${issueId}`);
  }

  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-background shadow-md flex items-center h-16 px-4'>
        <h1 className="text-2xl font-bold text-gray-900 mr-auto">Admin Portal</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="size-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-6" />
          </Button>
        </div>
      </div>
      <main className='h-screen pt-[calc(var(--spacing)*16)] flex'>
        <div className='border-r h-full w-full p-4 flex flex-col'>

          {/* Map view  */}
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Interactive Map View</p>
              <p className="text-sm text-gray-400">Issues plotted by location</p>
            </div>
          </div>

          {/* Filters in a row */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {/* Issue Category */}
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Issue Category</label>
                  <Select value={selectedFilters.category} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.entries(ISSUE_TYPES).map(([type, name]) => (
                        <SelectItem key={type} value={type}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select value={selectedFilters.priority} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      {Object.entries(PRIORITY_LEVELS).map(([level, name]) => (
                        <SelectItem key={level} value={level}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={selectedFilters.status} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {Object.entries(STATUS_TYPES).map(([status, name]) => (
                        <SelectItem key={status} value={status}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right side box with table */}
        <div className='h-full w-full p-4'>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Issues</CardTitle>
              <CardDescription>Recently reported issues</CardDescription>
            </CardHeader>
            <CardContent className={"overflow-y-scroll"}>
              <div className="h-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium text-sm">Issue #</th>
                      <th className="pb-2 font-medium text-sm">Type</th>
                      <th className="pb-2 font-medium text-sm">Location</th>
                      <th className="pb-2 font-medium text-sm">Priority</th>
                      <th className="pb-2 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue) => (
                      <tr
                        key={issue.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(issue.id)}
                      >
                        <td className="py-3 text-sm">{issue.id}</td>
                        <td className="py-3 text-sm capitalize">{ISSUE_TYPES[issue.type] || issue.type}</td>
                        <td className="py-3 text-sm">{issue.location}</td>
                        <td className="py-3">
                          <Badge variant="outline" className={`capitalize ${getPriorityColor(issue.priority).color}`}>
                            {PRIORITY_LEVELS[issue.priority] || 'N/A'}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className={`capitalize ${getStatusColor(issue.status).color}`}>
                            {STATUS_TYPES[issue.status] || 'N/A'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}