const express = require('express')
const echo = require('./node_app/controller/echo') 
const todo = require('./node_app/controller/todo')
const { connectDB, disconnectDB } = require('./db/connect')
const httpShutdown = require("http-shutdown");

const main = async()=>{
    var app = express()

    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    app.use('/app/echo' , echo) 
    app.use('/app/no_auth', todo)
    
    await connectDB()
    
    var server = httpShutdown(app.listen(3000));

	// graceful shutdown
	var called = false;
	const shutdown = () => {
		if (called) return;
		called = true;
		console.log("shutdown");
		server.shutdown(async (err) => {
			try {
				await disconnectDB();
				console.log("disconnect");
				return process.exit(0);
			} catch (e) {
				err = e;
			}
			console.error(err);
			return process.exit(1);
		});
	};
	process.once("SIGINT", shutdown).once("SIGTERM", shutdown);
}

main() 