const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const LoadingIndicator = () => {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
};

export default LoadingIndicator;
