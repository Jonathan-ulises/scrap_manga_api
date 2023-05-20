import express, { Application } from "express";

// Routes
import homeRoute from '../routes/home.routes';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        home: '/api/v1/'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middleware();
    }

    middleware(): void {
        this.app.use( express.json() );
    }

    routes(): void {
        this.app.use( this.apiPaths.home, homeRoute )
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ', this.port)
        })
    }

}

export default Server;