import React from "react";
import {
  isBrowser,
  isMobile,
  isTablet,
  osName,
  osVersion,
  browserName,
  browserVersion,
  deviceType,
} from "react-device-detect";

const DeviceInfo = () => {
  return (
    <div>
      {/* <h1>Device Information</h1> */}
      {/* <p>
        <strong>Device Type:</strong>
        {isBrowser
          ? "Browser"
          : isMobile
          ? "Mobile"
          : isTablet
          ? "Tablet"
          : "Unknown"}
      </p> */}
      <p className="font-bold">
         {osName} {osVersion}
      </p>
      <p>
        {/* <strong>Browser:</strong> {browserName} {browserVersion} */}
      </p>
      <p>
        {/* <strong>Device:</strong> {deviceType} */}
      </p>
    </div>
  );
};

export default DeviceInfo;
