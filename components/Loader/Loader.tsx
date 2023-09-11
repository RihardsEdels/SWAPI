const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green"></div>
      <p className="text-white mt-4">Loading</p>
    </div>
  );
};

export default Loader;
