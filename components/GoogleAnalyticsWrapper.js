import React, { Suspense } from "react";
import { GoogleAnalytics } from "./GoogleAnalytics";

const GoogleAnalyticsWrapper = () => {
  return (
    <Suspense fallback={<div className="sr-only">...</div>}>
      <GoogleAnalytics />
    </Suspense>
  );
};

export default GoogleAnalyticsWrapper;
