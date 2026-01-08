export default function AccessDenied() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className="max-w-xl w-full bg-white  shadow-xl rounded-2xl p-8 sm:p-12 text-center"
        role="alert"
        aria-live="assertive"
      >
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-50  mb-6">
          <svg
            className="w-12 h-12 text-red-600 dark:text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 11v2m0 4h.01M7 11V7a5 5 0 0110 0v4M5 20h14a1 1 0 001-1v-6a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1z"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900  mb-2">
          Access Denied
        </h1>
        <p className="text-sm sm:text-base text-gray-600  mb-6">
          You don’t have permission to view this page. If you believe you
          should, contact your administrator.
        </p>

        <p className="text-xs text-gray-400 mt-6">
          Include the page URL and your username in the request for faster
          processing.
        </p>
      </div>
    </section>
  );
}
