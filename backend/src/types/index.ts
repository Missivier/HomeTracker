// DTO pour la création d'une tâche
export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
}

// DTO pour la mise à jour d'une tâche
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Type pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Options pour les routes
export interface RouteOptions {
  prefix?: string;
}

// Options pour les plugins
export interface PluginOptions {
  logLevel?: string;
}
