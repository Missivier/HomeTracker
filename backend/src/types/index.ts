// Models/Entities

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

// API Responses

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Route Options

export interface RouteOptions {
  prefix?: string;
}

// Plugin Options

export interface PluginOptions {
  logLevel?: string;
}
