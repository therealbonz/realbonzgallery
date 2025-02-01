Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*' # Change this to your frontend URL in production
      resource '*',
        headers: :any,
        expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
        methods: [:get, :post, :put, :delete, :options]
    end
  end