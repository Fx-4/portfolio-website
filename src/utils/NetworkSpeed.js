// src/utils/networkSpeed.js
export const checkServerLatency = async (endpoint) => {
    const start = performance.now();
    try {
      await fetch(endpoint);
      const end = performance.now();
      return end - start; // Returns latency in milliseconds
    } catch (error) {
      console.error('Error checking server latency:', error);
      return null;
    }
  };