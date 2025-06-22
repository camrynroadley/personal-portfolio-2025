export const Spinner = () => {
  return (
    <div
      className="h-[100vh] flex items-center justify-center"
      role="status"
      aria-label="Loading spinner"
      data-testid="spinner-wrapper"
    >
      <div
        className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
        data-testid="spinner"
      />
    </div>
  );
};
