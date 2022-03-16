import { MOCK_DATA } from "../assets/mock-data";
import { ApiResponse } from "../types";

const MockApi = (): Promise<ApiResponse> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 100)
  );

export default MockApi;
