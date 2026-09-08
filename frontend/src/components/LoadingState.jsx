const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
      <p className="text-muted text-sm">{message}</p>
    </div>
  )
}

export default LoadingState
