test:
	yarn test:e2e:all

lint:
	yarn lint

tsc:
	yarn tsc

ci: tsc lint test

tauri:
	yarn tauri:build

# Build docker image to run elasticvue served by nginx
docker_nginx:
	docker build -f docker/Dockerfile -t elasticvue .

# Build docker image to run elasticvue served by nginx MULTIARCH
docker_nginx_multiarch:
	docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t elasticvue -f docker/Dockerfile_multiarch .

# Build elasticvue browser extensions into ./artifacts via docker
browser_ext:
	docker build -f docker/Dockerfile_browser_ext -t elasticvue:build_browser_ext .
	docker run --rm -v ./artifacts:/app/artifacts elasticvue:build_browser_ext scripts/build_browser_extensions.sh
