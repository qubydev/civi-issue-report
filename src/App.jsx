import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, Settings, Bell } from 'lucide-react'
import { ISSUE_TYPES, PRIORITY_LEVELS, STATUS_TYPES, getPriorityColor, getStatusColor } from '@/lib/helpers';
import { useNavigate } from 'react-router-dom'
import GoogleMapReact from 'google-map-react';

export default function App() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all'
  });


  // map settings 
  const defaultProps = {
    center: {
      lat: 22.5726,
      lng: 88.3639
    },
    zoom: 16
  };


  const filteredIssues = issues.filter(issue => {
    return (selectedFilters.category === 'all' || issue.type === selectedFilters.category) &&
      (selectedFilters.priority === 'all' || issue.priority === selectedFilters.priority) &&
      (selectedFilters.status === 'all' || issue.status === selectedFilters.status);
  });

  const handleRowClick = (issueId) => {
    navigate(`/issue/${issueId}`);
  }

  const fetchIssues = async () => {
    try {
      const response = await fetch('https://sih-backend-sepia.vercel.app/api/v1/issues');
      const data = await response.json();
      setIssues(data.issues || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      alert("Failed to fetch issues. Please try again later.");
    }
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-background shadow-md flex items-center h-16 px-4 z-50'>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mr-auto">Admin Portal</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="size-4 sm:size-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Settings className="size-4 sm:size-6" />
          </Button>
        </div>
      </div>
      <main className='min-h-screen pt-16 flex flex-col lg:flex-row'>
        <div className='h-auto lg:h-full w-full lg:w-1/2 px-4 lg:py-4 mt-4 lg:mt-0 flex flex-col'>

          {/* Map view  */}
          <div className="h-64 sm:h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {filteredIssues.map(issue => (
                <div
                  key={issue.id}
                  lat={issue.geotag.lat}
                  lng={issue.geotag.lng}
                  className={`size-4 rounded-full ${issue.priority === 'high' ? 'bg-red-500' : issue.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                  title={issue.geotag.placeName}
                >
                </div>
              ))}
            </GoogleMapReact>
          </div>

          {/* Filters in a row */}
          <Card className="mb-4 gap-2">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2">
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
        <div className='h-auto lg:h-full w-full lg:w-1/2 px-4 lg:py-4'>
          <Card className="h-auto lg:h-full">
            <CardHeader>
              <CardTitle>Issues</CardTitle>
              <CardDescription>Recently reported issues</CardDescription>
            </CardHeader>
            <CardContent className={"overflow-hidden"}>
              <div className="h-auto lg:h-full overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium text-sm px-2">Type</th>
                      <th className="pb-2 font-medium text-sm px-2">Location</th>
                      <th className="pb-2 font-medium text-sm px-2">Priority</th>
                      <th className="pb-2 font-medium text-sm px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue) => (
                      <tr
                        key={issue.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(issue.id)}
                      >
                        <td className="py-3 text-sm capitalize px-2">{ISSUE_TYPES[issue.type] || issue.type}</td>
                        <td className="py-3 text-sm px-2">
                          <span className="block max-w-[200px] truncate" title={issue.geotag.placeName}>
                            {issue.geotag.placeName.length > 30
                              ? issue.geotag.placeName.slice(0, 30) + '...'
                              : issue.geotag.placeName}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className={`capitalize text-xs ${getPriorityColor(issue.priority).color}`}>
                            {PRIORITY_LEVELS[issue.priority] || 'N/A'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className={`capitalize text-xs ${getStatusColor(issue.status).color}`}>
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