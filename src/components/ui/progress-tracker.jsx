import React from 'react'
import { CheckCircle, Clock, User, Settings, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PROGRESS_STEPS = [
    {
        key: 'pending',
        label: 'Pending',
        description: 'Issue reported',
        icon: Clock,
        color: 'orange'
    },
    {
        key: 'assigned',
        label: 'Assigned',
        description: 'Team assigned',
        icon: User,
        color: 'blue'
    },
    {
        key: 'processing',
        label: 'In Progress',
        description: 'Work in progress',
        icon: Settings,
        color: 'purple'
    },
    {
        key: 'resolved',
        label: 'Resolved',
        description: 'Issue completed',
        icon: CheckCircle2,
        color: 'green'
    }
]

const getStepIndex = (status) => {
    return PROGRESS_STEPS.findIndex(step => step.key === status)
}

const isStepCompleted = (stepIndex, currentIndex) => {
    return stepIndex <= currentIndex
}

const isStepActive = (stepIndex, currentIndex) => {
    return stepIndex === currentIndex
}

export function ProgressTracker({ currentStatus, className }) {
    const currentIndex = getStepIndex(currentStatus)

    return (
        <div className={cn("w-full", className)}>
            <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-200 rounded-full" />

                {/* Active Progress Bar */}
                <div
                    className="absolute top-6 left-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700 ease-in-out"
                    style={{
                        width: currentIndex >= 0 ? `${(currentIndex / (PROGRESS_STEPS.length - 1)) * 100}%` : '0%',
                        maxWidth: 'calc(100% - 4rem)'
                    }}
                />

                {/* Steps */}
                <div className="relative flex justify-between">
                    {PROGRESS_STEPS.map((step, index) => {
                        const StepIcon = step.icon
                        const isCompleted = isStepCompleted(index, currentIndex)
                        const isActive = isStepActive(index, currentIndex)

                        return (
                            <div key={step.key} className="flex flex-col items-center group">
                                {/* Step Circle */}
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10",
                                            {
                                                // Completed state
                                                "bg-green-500 border-green-500 text-white shadow-lg": isCompleted && !isActive,
                                                // Active state
                                                "bg-blue-500 border-blue-500 text-white shadow-lg animate-pulse": isActive,
                                                // Pending state
                                                "bg-white border-gray-300 text-gray-400 group-hover:border-gray-400": !isCompleted && !isActive
                                            }
                                        )}
                                    >
                                        {isCompleted && !isActive ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <StepIcon
                                                className={cn(
                                                    "w-5 h-5 transition-all duration-300",
                                                    {
                                                        "animate-spin": isActive && step.key === 'processing'
                                                    }
                                                )}
                                            />
                                        )}
                                    </div>

                                    {/* Active step pulse ring */}
                                    {isActive && (
                                        <div className="absolute inset-0 w-12 h-12 rounded-full bg-blue-400 animate-ping opacity-25" />
                                    )}
                                </div>

                                {/* Step Label */}
                                <div className="mt-3 text-center min-w-0 max-w-20">
                                    <p
                                        className={cn(
                                            "text-sm font-medium transition-colors duration-300",
                                            {
                                                "text-green-600": isCompleted && !isActive,
                                                "text-blue-600": isActive,
                                                "text-gray-500": !isCompleted && !isActive
                                            }
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                    <p
                                        className={cn(
                                            "text-xs mt-1 transition-colors duration-300",
                                            {
                                                "text-green-500": isCompleted && !isActive,
                                                "text-blue-500": isActive,
                                                "text-gray-400": !isCompleted && !isActive
                                            }
                                        )}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProgressTracker