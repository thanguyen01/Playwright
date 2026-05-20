/**
 * API Client for making HTTP requests
 * Provides simple methods for GET, POST, PUT, DELETE operations
 */
export class APIClient {
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.BASE_URL || 'http://eaapp.somee.com';
  }

  /**
   * GET request
   * @param {string} endpoint
   * @returns {Promise<APIResponse>}
   */
  async get(endpoint) {
    return await this.request.get(`${this.baseURL}${endpoint}`);
  }

  /**
   * POST request
   * @param {string} endpoint
   * @param {object} data
   * @returns {Promise<APIResponse>}
   */
  async post(endpoint, data) {
    return await this.request.post(`${this.baseURL}${endpoint}`, { data });
  }

  /**
   * PUT request
   * @param {string} endpoint
   * @param {object} data
   * @returns {Promise<APIResponse>}
   */
  async put(endpoint, data) {
    return await this.request.put(`${this.baseURL}${endpoint}`, { data });
  }

  /**
   * PATCH request
   * @param {string} endpoint
   * @param {object} data
   * @returns {Promise<APIResponse>}
   */
  async patch(endpoint, data) {
    return await this.request.patch(`${this.baseURL}${endpoint}`, { data });
  }

  /**
   * DELETE request
   * @param {string} endpoint
   * @returns {Promise<APIResponse>}
   */
  async delete(endpoint) {
    return await this.request.delete(`${this.baseURL}${endpoint}`);
  }
}
