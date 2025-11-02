interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification = ({ type, message, onClose }: NotificationProps) => {
  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out translate-x-0 opacity-100`}>
      <div className={`rounded-lg shadow-lg p-4 flex items-start gap-3 ${
        type === 'success' 
          ? 'bg-green-50 border-l-4 border-green-500' 
          : 'bg-red-50 border-l-4 border-red-500'
      }`}>
        {type === 'success' ? (
          <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <div className="flex-1">
          <p className={`font-semibold ${
            type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </p>
          <p className={`text-sm mt-1 ${
            type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${
            type === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
