# Use the lightweight Nginx Alpine image
FROM nginx:alpine

# Remove default Nginx config and index page
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static web app files into the container
COPY . /usr/share/nginx/html

# Expose port 8080 according to Cloud Run expectations
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
