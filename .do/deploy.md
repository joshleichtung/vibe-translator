# DigitalOcean App Platform Deployment Guide

## Deployment Options

This application can be deployed using either **Static Site** mode (recommended) or **Web Service** mode.

---

## Option 1: Static Site Mode (RECOMMENDED)

This is the simplest and most efficient deployment method for a Vite static site.

### Configuration File
The `.do/app.yaml` file configures this deployment as a static site:
- **Build command**: `npm run build`
- **Output directory**: `dist/`
- **Catchall document**: `index.html` (for SPA routing)

### Deployment Steps

1. **Connect Your GitHub Repository**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Select "GitHub" as source
   - Authorize DigitalOcean and select your repository
   - Select branch: `main`

2. **Configure as Static Site**
   - DigitalOcean should auto-detect the `.do/app.yaml` configuration
   - If not auto-detected, manually configure:
     - **Component Type**: Static Site
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Catchall Document**: `index.html`

3. **Environment Variables** (if needed)
   - Add any required environment variables in the DigitalOcean UI
   - Vite environment variables should be prefixed with `VITE_`

4. **Deploy**
   - Click "Next" → Review settings → "Create Resources"
   - DigitalOcean will build and deploy your site
   - You'll get a `.ondigitalocean.app` URL

---

## Option 2: Web Service Mode (Fallback)

If you need to deploy as a web service (not recommended for static sites), use the `serve` package.

### Configuration
The `package.json` includes a `start` script:
```json
"start": "serve dist -s -p 8080"
```

### Deployment Steps

1. **Create App**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App" → Select GitHub repository

2. **Configure as Web Service**
   - **Component Type**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: 8080
   - **Environment**: Node.js

3. **Health Check Configuration**
   - **Path**: `/`
   - **Port**: 8080
   - **Protocol**: HTTP

4. **Deploy**
   - Continue with deployment
   - Monitor build logs for any issues

---

## Option 3: Nginx Configuration (Advanced)

For custom nginx configuration, use the provided `.do/nginx.conf.template`.

### Manual Configuration
If deploying with custom Dockerfile:

1. Create a `Dockerfile` in project root:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY .do/nginx.conf.template /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

2. Configure DigitalOcean to use Dockerfile deployment

---

## Troubleshooting

### Error: "failed to launch: determine start command"
**Cause**: DigitalOcean is trying to run as Node.js app instead of serving static files.

**Solution**: Use **Option 1** (Static Site mode) - this is the correct configuration.

### Error: "failed health checks after 2 attempts"
**Cause**: Application not listening on expected port or not responding to health checks.

**Solutions**:
1. Verify component type is **Static Site** (Option 1)
2. If using web service, ensure `npm start` runs successfully
3. Check that port 8080 is configured correctly
4. Verify health check path is `/`

### Build Fails
**Solutions**:
1. Check build logs in DigitalOcean console
2. Verify `npm run build` works locally
3. Ensure all dependencies are in `package.json` (not just devDependencies)
4. Check for environment-specific build errors

### 404 Errors on Routes
**Cause**: SPA routing not configured.

**Solution**: Ensure `catchall_document: index.html` is set in static site configuration.

---

## Local Testing

### Test Static Build
```bash
npm run build
npm start
```
Visit `http://localhost:8080` to verify the production build.

### Test with Vite Preview
```bash
npm run build
npm run preview
```
This uses Vite's preview server (different from production serve).

---

## Cost Optimization

Static sites on DigitalOcean App Platform:
- **Starter tier**: $0/month (3 static sites)
- **Pro tier**: $3/month per site (if you need more)

Using static site mode (Option 1) is free for up to 3 sites and much cheaper than web service mode.

---

## Next Steps After Deployment

1. **Custom Domain**: Add your custom domain in App Platform settings
2. **SSL/TLS**: DigitalOcean provides free SSL certificates
3. **CDN**: Enable DigitalOcean CDN for faster global delivery
4. **Environment Variables**: Set production environment variables if needed
5. **Auto-Deploy**: Configure automatic deployments on git push

---

## Support

For DigitalOcean App Platform documentation:
- [Static Sites Guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-static-sites/)
- [Build Configuration](https://docs.digitalocean.com/products/app-platform/reference/app-spec/)
- [Troubleshooting](https://docs.digitalocean.com/products/app-platform/troubleshooting/)
