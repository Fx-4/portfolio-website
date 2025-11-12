import PropTypes from 'prop-types';
import useSSE from '../utils/useSSE';

const SSEPanel = ({ url = '/react-bits-sse' }) => {
  const { messages, status, connect, disconnect, clear } = useSSE(url, {
    autoStart: true,
    maxMessages: 200,
    closeOnError: false,
  });

  const statusColor = {
    idle: 'bg-gray-400',
    connecting: 'bg-amber-500',
    open: 'bg-emerald-500',
    error: 'bg-red-500',
    closed: 'bg-gray-500',
  }[status] || 'bg-gray-400';

  return (
    <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor}`} />
            <span className="text-sm font-medium text-gray-700">React Bits Live Recommendations</span>
            <span className="text-xs text-gray-500">(status: {status})</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={connect} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100">Connect</button>
            <button onClick={disconnect} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100">Disconnect</button>
            <button onClick={clear} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100">Clear</button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No messages yet.</p>
          ) : (
            <div className="h-56 overflow-y-auto rounded border border-gray-100 bg-gray-50 p-3">
              <ul className="space-y-2">
                {messages.slice(-50).map((m, i) => (
                  <li key={i} className="text-xs leading-relaxed font-mono text-gray-800 whitespace-pre-wrap break-words">
                    {typeof m === 'string' ? m : JSON.stringify(m, null, 2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

SSEPanel.propTypes = {
  url: PropTypes.string,
};

export default SSEPanel;
