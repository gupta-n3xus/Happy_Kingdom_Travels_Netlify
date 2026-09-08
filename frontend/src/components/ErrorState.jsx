import { AlertTriangle, RefreshCw } from 'lucide-react'

const ErrorState = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
      <p className="text-charcoal font-medium text-lg mb-2">Oops!</p>
      <p className="text-muted text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState
