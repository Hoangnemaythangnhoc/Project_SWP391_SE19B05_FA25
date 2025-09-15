const API_BASE_URL = 'http://localhost:9090/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  async login(email, password, rememberMe = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.accessToken, data.refreshToken);
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      return { success: false, error: 'Lỗi kết nối đến server' };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.accessToken, data.refreshToken);
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Đăng ký thất bại' };
      }
    } catch (error) {
      return { success: false, error: 'Lỗi kết nối đến server' };
    }
  }

  async refreshToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.accessToken, data.refreshToken);
        return { success: true, data };
      } else {
        this.logout();
        return { success: false, error: 'Refresh token không hợp lệ' };
      }
    } catch (error) {
      this.logout();
      return { success: false, error: 'Lỗi kết nối đến server' };
    }
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Không thể lấy thông tin người dùng' };
      }
    } catch (error) {
      return { success: false, error: 'Lỗi kết nối đến server' };
    }
  }

  async checkRole(role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-role/${role}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, hasRole: data.hasRole };
      } else {
        return { success: false, hasRole: false };
      }
    } catch (error) {
      return { success: false, hasRole: false };
    }
  }

  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  // Helper method to make authenticated requests
  async makeAuthenticatedRequest(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    // If token is expired, try to refresh
    if (response.status === 401 && this.refreshToken) {
      const refreshResult = await this.refreshToken();
      if (refreshResult.success) {
        // Retry the request with new token
        const retryOptions = {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            'Authorization': `Bearer ${this.token}`,
          },
        };
        return fetch(url, retryOptions);
      }
    }

    return response;
  }
}

export default new AuthService();


