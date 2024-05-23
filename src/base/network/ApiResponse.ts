interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown; // Assuming API response structure
}

export default ApiResponse;