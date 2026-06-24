const { spawn } = require("child_process");

console.log("Starting Backend (Port 3000)...");
const backend = spawn("npm", ["run", "server"], {
    stdio: "inherit",
    shell: true
});

console.log("Starting Frontend (Port 1234)...");
const frontend = spawn("npm", ["run", "start"], {
    stdio: "inherit",
    shell: true
});

// Handle graceful shutdown
const shutdown = () => {
    console.log("\nShutting down dev servers...");
    backend.kill();
    frontend.kill();
    process.exit();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("exit", shutdown);
