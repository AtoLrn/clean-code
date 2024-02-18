
install: 
	cd backend && npm install && cd ../frontend && npm install

start: run_backend run_frontend

run_backend:
	cd backend && npm run dev

run_frontend:
	cd frontend && npm run dev

test: 
	cd backend && npm run test && cd ../frontend && npm run test
