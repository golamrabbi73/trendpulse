export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} TrendPulse AI. All rights reserved.
      </div>
    </footer>
  );
}
