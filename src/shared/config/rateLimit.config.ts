interface RateLimitConfig {
    windowMs: number;
    max: number;
    message: string;
  }
  
  export const rateLimitConfig = {
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100,
      message: 'Has excedido el límite de peticiones. Por favor, inténtalo de nuevo en 15 minutos.'
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 10,
      message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en 15 minutos.'
    }
  };